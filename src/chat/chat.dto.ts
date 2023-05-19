import { Expose } from 'class-transformer';
import {
  IsArray,
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

export class MessageV1DTO {
  role: string;
  content: string;
  name?: string
}

export class ChatCompletionRequestV1DTO {
  @IsString()
  model!: string;

  @IsArray()
  messages!: MessageV1DTO[];


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

  @IsOptional()
  stop?: string | string[];

  @IsNumber()
  @IsOptional()
  max_tokens?: number;

  @IsNumber()
  @IsOptional()
  presence_penalty?: number;

  @IsNumber()
  @IsOptional()
  frequency_penalty?: number;

  @IsObject()
  @IsOptional()
  logit_bias?: Record<string, number>;

  @IsString()
  @IsOptional()
  user?: string;
}

export class ChatCompletionResponseV1DTO {
  @Expose()
  id: string;

  @Expose()
  object: string;

  @Expose()
  created: number;

  @Expose()
  choices: ChoiceV1DTO[];

  @Expose()
  usage: UsageV1DTO;
}

@Expose()
export class ChoiceV1DTO {
  index: number;
  message: MessageV1DTO;
  finish_reason: string;
}
