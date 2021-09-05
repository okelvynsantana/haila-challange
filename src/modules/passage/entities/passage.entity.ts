import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PassageType {
  entry = 'entry',
  exit = 'exit',
}

@ObjectType()
@Entity()
export class Passage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    nullable: false,
  })
  @Field()
  name: string;

  @Column({
    type: 'enum',
    enum: PassageType,
    enumName: 'type',
  })
  @Field()
  type: PassageType;

  @Column({ type: 'float' })
  @Field()
  lat: number;

  @Column({ type: 'float' })
  @Field()
  lng: number;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @UpdateDateColumn()
  @Field()
  updated_at: Date;
}
