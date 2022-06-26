import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post, Post as PostEntity } from '../posts/post.entity';
import { Post as PostModel } from '../posts/post.model';
import { UserInput } from './dto/user.input';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly usersService: UsersService,
  ) {}

  @ResolveField('posts', () => [PostModel])
  getPosts(@Parent() user: User): Promise<PostEntity[]> {
    return this.postsRepository.find({ where: { userId: user.id } });
  }

  @Query(() => User, { name: 'user' })
  getUserById(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Query(() => [User], { name: 'users' })
  getAllUsers(): Promise<User[]> {
    return this.usersService.getUsers();
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
