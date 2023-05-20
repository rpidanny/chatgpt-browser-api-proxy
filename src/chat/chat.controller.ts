import { Body, Controller, Post } from '@nestjs/common';

import {
  ChatCompletionRequestV1DTO,
  ChatCompletionResponseV1DTO,
} from './chat.dto.js';
import { ChatService } from './chat.service.js';

@Controller('v1/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('completions')
  async complete(
    @Body() ChatDto: ChatCompletionRequestV1DTO
  ): Promise<ChatCompletionResponseV1DTO> {
    return await this.chatService.complete(ChatDto.messages);
  }
}
