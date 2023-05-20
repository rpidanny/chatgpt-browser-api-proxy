/* eslint-disable camelcase */
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { ChatGPTClient } from '../global/clients/chatgpt.client.js';
import { ChatCompletionResponseV1DTO, MessageV1DTO } from './chat.dto.js';

@Injectable()
export class ChatService {
  constructor(private readonly chatGptClient: ChatGPTClient) {}

  async complete(messages: MessageV1DTO[]) {
    const response = await this.chatGptClient.conversation(messages[0].content);

    return this.generateChatCompletionResponse(response);
  }

  private generateChatCompletionResponse(
    response: string
  ): ChatCompletionResponseV1DTO {
    return {
      id: randomUUID(),
      object: 'chat.completion',
      created: new Date().getTime(),
      choices: [
        {
          index: 0,
          message: {
            role: 'assistant',
            content: response,
          },
          finish_reason: 'stop',
        },
      ],
      usage: {
        prompt_tokens: 1,
        completion_tokens: 1,
        total_tokens: 2,
      },
    };
  }
}
