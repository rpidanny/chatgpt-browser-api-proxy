import { Module } from '@nestjs/common';

import { CompletionController } from './completion.controller.js';
import { CompletionService } from './completion.service.js';

@Module({
  controllers: [CompletionController],
  providers: [CompletionService],
})
export class CompletionModule {}
