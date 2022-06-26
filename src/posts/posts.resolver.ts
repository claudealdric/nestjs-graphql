import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from '../users/user.entity';
import { User as UserModel } from '../users/user.model';
import { Post as PostEntity } from './post.entity';
import { Post as PostModel } from './post.model';
import { PostsService } from './posts.service';

@Resolver(() => PostModel)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  @ResolveField('user', () => UserModel)
  getUser(@Parent() post: PostModel): Promise<UserEntity> {
    return this.usersRepository.findOneOrFail(post.userId);
  }

  @Query(() => [PostModel], { name: 'posts' })
  getPosts(): Promise<PostEntity[]> {
    return this.postsService.getPosts();
  }
}
