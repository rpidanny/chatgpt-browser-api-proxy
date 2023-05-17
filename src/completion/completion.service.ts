import { Injectable } from '@nestjs/common';

import { ChatGPTClient } from '../global/clients/chatgpt.client.js';

@Injectable()
export class CompletionService {
  constructor(private readonly chatGptClient: ChatGPTClient) {}

  async complete(prompt: string) {
    return await this.chatGptClient.conversation(prompt);
  }
}
