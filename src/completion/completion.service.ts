import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { ChatGPTClient } from '../global/clients/chatgpt.client.js';
import { CompletionResponseV1DTO } from './completion.dto.js';

@Injectable()
export class CompletionService {
  constructor(private readonly chatGptClient: ChatGPTClient) {}

  async complete(prompt: string | string[]) {
    if (typeof prompt === 'string') {
      const response = await this.chatGptClient.conversation(prompt);

      return this.generateCompletionResponse(response);
    } else {
      throw new Error('Not implemented');
    }
  }

  private generateCompletionResponse(response: string): CompletionResponseV1DTO {
    return {
      id: randomUUID(),
      object: 'text_completion',
      created: new Date().getTime(),
      model: 'text-davinci-002-render-sha',
      choices: [
        {
          text: response,
          index: 0,
          logprobs: null,
          finish_reason: 'length',
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
