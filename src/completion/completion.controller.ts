import { Body, Controller, Post } from '@nestjs/common';

import { CompletionService } from './completion.service.js';
import { CompletionRequestV1DTO } from './completion.dto.js';

@Controller('v1/completion')
export class CompletionController {
  constructor(private readonly completionService: CompletionService) {}

  @Post()
  async complete(@Body() completionDto: CompletionRequestV1DTO) {
    return await this.completionService.complete(completionDto.prompt);
  }
}
