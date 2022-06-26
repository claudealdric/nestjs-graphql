import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from '../posts/post.model';
import { BaseModel } from '../shared/base.model';

@ObjectType({ implements: () => [BaseModel] })
export class User extends BaseModel {
  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => [Post], { nullable: 'items' })
  posts: Post[];
}
