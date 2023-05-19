import { Body, Controller, Post } from '@nestjs/common';

import { ChatService } from './chat.service.js';
import {
  ChatCompletionRequestV1DTO,
  ChatCompletionResponseV1DTO,
} from './chat.dto.js';

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
