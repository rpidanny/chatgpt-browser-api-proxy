/* eslint-disable camelcase */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Browser, chromium } from 'playwright';

@Injectable()
export class ChatGPTClient {
  baseUrl = 'https://chat.openai.com';
  parentMessageId = randomUUID();
  browser: Browser;

  constructor(@Inject(Logger) private readonly logger: Logger) {}

  async init() {
    this.logger.log('Initializing ChatGPTClient');
    this.browser = await chromium.launch({ headless: false });
    this.logger.log('ChatGPTClient initialized');
  }

  async conversation(prompt: string): Promise<string> {
    const url = `${this.baseUrl}/backend-api/conversation`;

    const headers = this.getHeaders();
    const payload = this.generateConversationPayload(prompt);

    const { answer } = await this.call(
      'POST',
      url,
      headers,
      payload
    );

    return answer;
  }

  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_TOKEN}`,
    };
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
      parent_message_id: this.parentMessageId,
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
  ): Promise<{ answer: string; conversationId: string }> {
    const context = await this.browser.newContext();
    const page = await context.newPage();
    await page.goto(this.baseUrl);

    const { answer, conversationId } = await page.evaluate(
      async ({ method, url, headers, body }) => {
        const textDecoder = new TextDecoder();

        const resp = await fetch(url, {
          method,
          headers,
          body: JSON.stringify(body),
        });

        if (resp.status !== 200)
          throw new Error('Error while calling ChatGPT API');

        const reader = resp.body?.getReader();
        if (!reader) throw new Error('No reader found');

        let chunk: ReadableStreamReadResult<Uint8Array>;
        let answer = '';
        let conversationId = '';

        while ((chunk = await reader.read()).done === false) {
          textDecoder
            .decode(chunk.value)
            .split('data: ')
            .map((e) => e.trim().replace(/^\n+/, '').replace(/\n+$/, ''))
            .filter((e) => e.length > 0 || e !== '[DONE]')
            .map((e) => {
              console.log(e);
              try {
                const parsedEvent = JSON.parse(e);

                if (parsedEvent.message.author.role === 'assistant') {
                  answer = parsedEvent.message.content.parts.join(' ');
                  conversationId = parsedEvent.message.conversation_id;
                  return answer;
                }
                return '';
              } catch (error) {}
            });
        }

        return { answer, conversationId };
      },
      { method, url, headers, body }
    );

    await context.close();

    return { answer, conversationId };
  }
}
