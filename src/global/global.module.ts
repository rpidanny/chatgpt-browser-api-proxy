import { DynamicModule, Global, Logger, Module } from '@nestjs/common';

import { ChatGPTClient } from './clients/chatgpt.client.js';

@Global()
@Module({})
export class GlobalModule {
  static forRootAsync(): DynamicModule {
    return {
      module: GlobalModule,
      imports: [],
      providers: [
        Logger,
        {
          provide: ChatGPTClient,
          useFactory: async (logger: Logger) => {
            const client = new ChatGPTClient(logger);
            await client.init();

            return client;
          },
          inject: [Logger],
        },
      ],
      exports: [ChatGPTClient],
    };
  }
}
