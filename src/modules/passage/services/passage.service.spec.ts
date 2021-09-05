import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Passage } from '../entities/passage.entity';
import { PassageService } from './passage.service';
import {
  mockAddPassageParams,
  mockPassageMockModelArray,
  mockPassageModel,
  mockUpdatedPassageModel,
} from './__mocks__/utils';

describe('Passage Service', () => {
  let service: PassageService;

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockPassageModel),
    find: jest.fn().mockReturnValue(mockPassageMockModelArray),
    save: jest.fn().mockReturnValue(mockPassageModel),
    update: jest.fn().mockReturnValue(mockUpdatedPassageModel),
    findOne: jest.fn().mockReturnValue(mockPassageModel),
    delete: jest.fn().mockReturnValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PassageService,
        {
          provide: getRepositoryToken(Passage),
          useValue: mockRepository,
        },
      ],
    }).compile();
    service = module.get<PassageService>(PassageService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should be create a new passage when receive valid params', async () => {
    const user = service.createPassage(mockAddPassageParams as Passage);

    expect(user).resolves.toBe(mockPassageModel);
    expect(mockRepository.create).toHaveBeenCalledTimes(1);
  });
});
