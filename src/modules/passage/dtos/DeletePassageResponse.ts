import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeletePassageResponse {
  @Field()
  passageDeleted: boolean;
}
