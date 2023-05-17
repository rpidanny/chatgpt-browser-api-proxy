import { DynamicModule, Global, Module } from '@nestjs/common';

import { ChatGPTClient } from './clients/chatgpt.client.js';

@Global()
@Module({})
export class GlobalModule {
  static forRootAsync(): DynamicModule {
    return {
      module: GlobalModule,
      imports: [],
      providers: [
        {
          provide: ChatGPTClient,
          useFactory: async () => {
            const client = new ChatGPTClient();
            await client.init();

            return client;
          },
          inject: [],
        },
      ],
      exports: [ChatGPTClient],
    };
  }
}
