import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePassageInput } from '../dtos/CreatePassageInput.dto';
import { DeletePassageResponse } from '../dtos/DeletePassageResponse';
import { UpdatePassageInput } from '../dtos/UpdatePassageInput';
import { Passage } from '../entities/passage.entity';

@Injectable()
export class PassageService {
  constructor(
    @InjectRepository(Passage)
    private passageRepository: Repository<Passage>,
  ) {}

  async createPassage(data: CreatePassageInput): Promise<Passage> {
    const passage = this.passageRepository.create(data);
    await this.passageRepository.save(passage);
    return passage;
  }

  async getPassages(): Promise<Passage[]> {
    const passages = await this.passageRepository.find();

    return passages;
  }

  async getPassageById(id: string): Promise<Passage> {
    const passage = await this.passageRepository.findOne({ id });

    console.log(passage);

    if (!passage) {
      throw new NotFoundException('User does not exists');
    }

    return passage;
  }

  async updatePassage(id: string, data: UpdatePassageInput): Promise<Passage> {
    const passage = await this.getPassageById(id);

    if (!passage) throw new NotFoundException('User does not exists');

    return await this.passageRepository.save({ ...passage, ...data });
  }

  async deletePassage(id: string): Promise<DeletePassageResponse> {
    const passage = await this.getPassageById(id);

    const passageDeleted = await this.passageRepository.delete(passage.id);
    if (!passageDeleted.affected) {
      throw new InternalServerErrorException();
    }

    return {
      passageDeleted: true,
    };
  }
}
