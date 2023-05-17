import { Test, TestingModule } from '@nestjs/testing';

import { CompletionService } from './completion.service.js';

describe('CompletionService', () => {
  let service: CompletionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompletionService],
    }).compile();

    service = module.get<CompletionService>(CompletionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
