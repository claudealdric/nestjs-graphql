import { Query, Resolver } from '@nestjs/graphql';
import { Post as PostEntity } from './post.entity';
import { Post as PostModel } from './post.model';
import { PostsService } from './posts.service';

@Resolver(() => PostModel)
export class PostsResolver {
  constructor(private readonly service: PostsService) {}

  @Query(() => [PostModel], { name: 'posts' })
  getPosts(): Promise<PostEntity[]> {
    return this.service.getPosts();
  }
}
