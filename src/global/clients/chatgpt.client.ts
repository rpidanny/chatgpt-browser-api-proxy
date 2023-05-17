/* eslint-disable camelcase */
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { chromium, Page } from 'playwright';
import { ReadableStreamDefaultReadResult } from 'stream/web';

@Injectable()
export class ChatGPTClient {
  textDecoder = new TextDecoder();
  baseUrl = 'https://chat.openai.com';
  page: Page;

  async init() {
    console.log('Initializing ChatGPTClient');
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();

    this.page = await context.newPage();

    await this.page.goto(this.baseUrl);

    console.log('ChatGPTClient initialized');
  }

  async conversation(prompt: string): Promise<string> {
    const url = `${this.baseUrl}/backend-api/conversation`;

    const headers = this.getHeaders();
    const payload = this.generateConversationPayload(prompt);

    const resp = await this.call('POST', url, headers, payload);

    const reader = resp.body?.getReader();
    if (!reader) throw new Error('No reader found');

    const answer = await this.handleStream(reader);

    return answer;
  }

  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_TOKEN}`,
    };
  }

  private async handleStream(
    stream: ReadableStreamDefaultReader
  ): Promise<string> {
    let chunk: ReadableStreamDefaultReadResult<Uint8Array>;
    let answer = '';

    while ((chunk = await stream.read()).done === false) {
      this.textDecoder
        .decode(chunk.value)
        .split('data: ')
        .map((e) => e.trim().replace(/^\n+/, '').replace(/\n+$/, ''))
        .filter((e) => e.length > 0 || e !== '[DONE]')
        .map((e) => {
          try {
            const parsedEvent = JSON.parse(e);

            if (parsedEvent.message.author.role === 'assistant') {
              answer = parsedEvent.message.content.parts.join(' ');
              return answer;
            }
            return '';
          } catch (error) {}
        });
    }

    return answer;
  }

  private generateConversationPayload(prompt: string) {
    return {
      action: 'next',
      messages: [
        {
          id: randomUUID(),
          author: {
            role: 'user',
          },
          content: {
            content_type: 'text',
            parts: [prompt],
          },
        },
      ],
      parent_message_id: randomUUID(),
      // conversation_id: "32326597-ad27-470f-85a0-d4514551bd15",
      model: 'text-davinci-002-render-sha',
      timezone_offset_min: -120,
      history_and_training_disabled: false,
      supports_modapi: true,
    };
  }

  private async call(
    method: string,
    url: string,
    headers?: Record<string, string>,
    body?: Record<string, unknown>
  ): Promise<Response> {
    return await this.page.evaluate(
      async ({ method, url, headers, body }) => {
        const resp = await fetch(url, {
          method,
          headers,
          body: JSON.stringify(body),
        });

        return resp;
      },
      { method, url, headers, body }
    );
  }
}
