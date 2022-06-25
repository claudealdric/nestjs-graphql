import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/shared/base.model';

@ObjectType({ implements: () => [BaseModel] })
export class User extends BaseModel {
  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName?: string;
}
