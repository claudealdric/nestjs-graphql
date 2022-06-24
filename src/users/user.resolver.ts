import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInput } from './dto/user.input';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

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
