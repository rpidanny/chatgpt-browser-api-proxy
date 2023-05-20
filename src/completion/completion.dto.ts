/* eslint-disable camelcase */
import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

@Expose()
export class LogprobsV1DTO {
  tokens: string[];
  token_logprobs: number[];
  top_logprobs: Record<string, number[]>;
  text_offset: number[];
  text: string;
  finish_reason: string;
}

export class UsageV1DTO {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export class CompletionRequestV1DTO {
  @IsString()
  model!: string;

  @IsOptional()
  prompt!: string[] | string;

  @IsOptional()
  @IsString()
  suffix?: string;

  @IsNumber()
  @IsOptional()
  max_tokens?: number;

  @IsNumber()
  @IsOptional()
  temperature?: number;

  @IsNumber()
  @IsOptional()
  top_p?: number;

  @IsNumber()
  @IsOptional()
  n?: number;

  @IsBoolean()
  @IsOptional()
  stream?: number;

  @IsNumber()
  @IsOptional()
  logprobs?: number;

  @IsBoolean()
  @IsOptional()
  echo?: boolean;

  @IsOptional()
  stop?: string | string[];

  @IsNumber()
  @IsOptional()
  presence_penalty?: number;

  @IsNumber()
  @IsOptional()
  frequency_penalty?: number;

  @IsNumber()
  @IsOptional()
  best_of?: number;

  @IsObject()
  @IsOptional()
  logit_bias?: Record<string, number>;

  @IsString()
  @IsOptional()
  user?: string;
}

export class CompletionResponseV1DTO {
  @Expose()
  id: string;

  @Expose()
  object: string;

  @Expose()
  created: number;

  @Expose()
  model: string;

  @Expose()
  choices: ChoiceV1DTO[];

  @Expose()
  usage: UsageV1DTO;
}

@Expose()
export class ChoiceV1DTO {
  text: string;
  index: number;
  logprobs: LogprobsV1DTO | null;
  finish_reason: string;
}
