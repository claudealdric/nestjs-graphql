import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post as PostEntity } from 'src/posts/post.entity';
import { Post as PostModel } from 'src/posts/post.model';
import { PostsService } from 'src/posts/posts.service';
import { UserInput } from './dto/user.input';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  @ResolveField('posts', () => [PostModel])
  getPosts(@Parent() user: User): Promise<PostEntity[]> {
    return this.postsService.getPostsForUser(user.id);
  }

  @Query(() => User, { name: 'user' })
  getUserById(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Query(() => [User], { name: 'users' })
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Mutation(() => User)
  createUser(@Args('userInput') user: UserInput): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('userInput') user: UserInput,
  ): Promise<User> {
    return this.usersService.updateUserById(id, user);
  }
}
