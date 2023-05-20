/* eslint-disable camelcase */
import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const hrToMillis = ([s, ns]: [number, number]): number =>
  Math.round(s * 1e3 + ns / 1e6);

const isError = (statusCode: number): boolean => statusCode >= 500;

const isWarn = (statusCode: number): boolean =>
  statusCode >= 400 && !isError(statusCode);

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(@Inject(Logger) private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const startAt = process.hrtime();
    const requestUrl = req.originalUrl || req.url;

    this.logger.log(`Incoming request ${req.method} ${requestUrl}`);

    res.on('finish', (): void => {
      const requestDuration = hrToMillis(process.hrtime(startAt));

      if (isError(res.statusCode)) {
        this.logger.error(
          this.formatResponseLog(res.statusCode, requestDuration)
        );
      } else if (isWarn(res.statusCode)) {
        this.logger.warn(
          this.formatResponseLog(res.statusCode, requestDuration)
        );
      } else {
        this.logger.log(
          this.formatResponseLog(res.statusCode, requestDuration)
        );
      }
    });

    next();
  }

  private formatResponseLog(statusCode: number, duration: number): string {
    return `Responding with status ${statusCode} in ${duration}ms`;
  }
}
