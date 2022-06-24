import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user' })
  async getUserById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Query(() => [User], { name: 'users' })
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
}
