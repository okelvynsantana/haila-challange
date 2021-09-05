import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passage } from './entities/passage.entity';
import { PassageResolver } from './resolvers/passage.resolver';
import { PassageService } from './services/passage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Passage])],
  providers: [PassageResolver, PassageService],
})
export class PassageModule {}
