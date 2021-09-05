import { Field, InputType } from '@nestjs/graphql';
import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PassageType } from '../entities/passage.entity';

@InputType()
export class UpdatePassageInput {
  @IsString()
  @IsOptional()
  @Field()
  name?: string;

  @IsOptional()
  @Field()
  type?: PassageType;

  @IsNotEmpty()
  @IsDecimal()
  @Field()
  lat: number;

  @IsNotEmpty()
  @IsDecimal()
  @Field()
  lng: number;
}
