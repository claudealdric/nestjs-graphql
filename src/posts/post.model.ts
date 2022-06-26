import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/shared/base.model';

@ObjectType({ implements: () => [BaseModel] })
export class Post extends BaseModel {
  @Field({ nullable: true })
  title: string;

  @Field()
  body: string;
}
