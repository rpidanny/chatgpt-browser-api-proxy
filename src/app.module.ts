import {
  Logger,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ChatModule } from './chat/chat.module.js';
import { CompletionModule } from './completion/completion.module.js';
import { GlobalModule } from './global/global.module.js';
import { RequestLoggerMiddleware } from './global/middlewares/request-logger.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GlobalModule.forRootAsync(),
    CompletionModule,
    ChatModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestLoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
