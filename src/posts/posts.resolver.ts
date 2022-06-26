import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User as UserEntity } from '../users/user.entity';
import { User as UserModel } from '../users/user.model';
import { UsersService } from '../users/users.service';
import { Post as PostEntity } from './post.entity';
import { Post as PostModel } from './post.model';
import { PostsService } from './posts.service';

@Resolver(() => PostModel)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  @ResolveField('user', () => UserModel)
  getUser(@Parent() post: PostModel): Promise<UserEntity> {
    return this.usersService.getUserById(post.userId);
  }

  @Query(() => [PostModel], { name: 'posts' })
  getPosts(): Promise<PostEntity[]> {
    return this.postsService.getPosts();
  }
}
