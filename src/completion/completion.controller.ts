import { Body, Controller, Post } from '@nestjs/common';

import { CompletionService } from './completion.service.js';

@Controller('v1/completion')
export class CompletionController {
  constructor(private readonly completionService: CompletionService) {}

  @Post()
  async complete(@Body() body: { prompt: string }) {
    return await this.completionService.complete(body.prompt);
  }
}
