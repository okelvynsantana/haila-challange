import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';

import { Passage } from '../entities/passage.entity';
import { PassageService } from './passage.service';
import {
  mockAddPassageParams,
  mockPassageMockModelArray,
  mockPassageModel,
  mockUpdatedPassageModel,
  mockUpdatedPassageParams,
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

  describe('Create Passage', () => {
    it('Should be create a new passage when receive valid params', async () => {
      const passage = service.createPassage(mockAddPassageParams as Passage);

      expect(passage).resolves.toBe(mockPassageModel);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('List passages', () => {
    it('should be return a passage list', () => {
      const passages = service.getPassages();

      expect(passages).resolves.toBe(mockPassageMockModelArray);
    });
  });

  describe('Get Passage by Id', () => {
    it('should be return a passage when receive a valid id', async () => {
      const passage = await service.getPassageById(mockPassageModel.id);

      expect(passage.id).toBe(mockPassageModel.id);
    });

    it('should return error when receive invalid id', async () => {
      mockRepository.findOne.mockReturnValue(null);
      const passage = service.getPassageById('dvsbdsba');

      expect(passage).rejects.toThrow(NotFoundException);
    });
  });

  describe('Update passage', () => {
    it('should be update a passage when receive valid params', async () => {
      service.getPassageById = jest.fn().mockReturnValueOnce(mockPassageModel);
      const updatePassage = service.updatePassage(
        mockPassageModel.id,
        mockUpdatedPassageParams,
      );

      expect(updatePassage).resolves.toBe(mockUpdatedPassageModel);
    });

    it('should return error when receive a invalid id', () => {
      service.getPassageById = jest.fn().mockReturnValueOnce(null);
      const updatePassage = service.updatePassage(
        'asfsrbg',
        mockUpdatedPassageParams,
      );

      expect(updatePassage).rejects.toThrow(NotFoundError);
    });
  });

  describe('Delete user', () => {
    it('should be delete user', async () => {
      service.getPassageById = jest.fn().mockReturnValueOnce(mockPassageModel);

      const deleted = service.deletePassage(mockPassageModel.id);

      expect(deleted).resolves.toBe({ passageDeleted: true });
    });

    it('should throw error when receive a invalid id', () => {
      service.getPassageById = jest.fn().mockReturnValueOnce(null);
      const deleted = service.deletePassage('teste');

      expect(deleted).rejects.toThrow(NotFoundException);
    });
  });
});
