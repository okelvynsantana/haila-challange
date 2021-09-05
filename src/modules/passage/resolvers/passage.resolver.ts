import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreatePassageInput } from '../dtos/CreatePassageInput.dto';
import { DeletePassageResponse } from '../dtos/DeletePassageResponse';
import { Passage } from '../entities/passage.entity';
import { PassageService } from '../services/passage.service';

@Resolver()
export class PassageResolver {
  constructor(private readonly passageService: PassageService) {}
  @Mutation(() => Passage)
  async CreatePassage(
    @Args('data') data: CreatePassageInput,
  ): Promise<Passage> {
    return await this.passageService.createPassage(data);
  }

  @Query(() => [Passage])
  async getPassages(): Promise<Passage[]> {
    return await this.passageService.getPassages();
  }

  @Query(() => Passage)
  async getPassage(@Args('id') id: string): Promise<Passage> {
    return await this.passageService.getPassageById(id);
  }

  @Mutation(() => Passage)
  async updatePassage(
    @Args('id') id: string,
    @Args('data') data: CreatePassageInput,
  ): Promise<Passage> {
    return await this.passageService.updatePassage(id, data);
  }

  @Mutation(() => DeletePassageResponse)
  async deletePassage(@Args('id') id: string): Promise<DeletePassageResponse> {
    return await this.passageService.deletePassage(id);
  }
}
