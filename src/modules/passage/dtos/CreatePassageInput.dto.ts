import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, IsDecimal } from 'class-validator';
import { PassageType } from '../entities/passage.entity';

@InputType()
export class CreatePassageInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsNotEmpty()
  @Field()
  type: PassageType;

  @IsNotEmpty()
  @IsDecimal()
  @Field()
  lat: number;

  @IsNotEmpty()
  @IsDecimal()
  @Field()
  lng: number;
}
