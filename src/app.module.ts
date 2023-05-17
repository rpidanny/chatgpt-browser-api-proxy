import { Module } from '@nestjs/common';

import { CompletionModule } from './completion/completion.module.js';
import { GlobalModule } from './global/global.module.js';

@Module({
  imports: [GlobalModule.forRootAsync(), CompletionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
