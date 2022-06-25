import { Field, GraphQLISODateTime, ID, InterfaceType } from '@nestjs/graphql';
import { BaseObject } from './base-object.interface';

@InterfaceType()
export abstract class BaseModel implements BaseObject {
  @Field(() => ID)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdDate: Date;

  @Field(() => GraphQLISODateTime)
  updatedDate: Date;
}
