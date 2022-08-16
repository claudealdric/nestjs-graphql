import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInput } from './dto/user.input';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  createUser(user: UserInput): Promise<User> {
    return this.repository.save(user);
  }

  async getUsers(): Promise<User[]> {
    let users = await this.repository.find();
    if (users.length < 2) {
      await this.seedUsers();
      users = await this.repository.find();
    }
    return users;
  }

  getUserById(id: number): Promise<User> {
    return this.repository.findOneOrFail(id);
  }

  async updateUserById(id: number, userInput: UserInput): Promise<User> {
    let user = await this.repository.findOneOrFail(id);
    user = { ...user, ...userInput };
    return this.repository.save(user);
  }

  private async seedUsers(): Promise<void> {
    const users: User[] = [];
    for (let i = 0; i < 50; i += 1) {
      const newUser = this.createFakeUser();
      users.push(newUser);
    }
    await this.repository.save(users);
  }

  private createFakeUser(): User {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const city = faker.address.cityName();
    const state = faker.address.stateAbbr();
    const user = this.repository.create();

    user.firstName = firstName;
    user.lastName = lastName;
    user.username = faker.internet.userName(firstName, lastName);
    user.email = faker.internet.exampleEmail(firstName, lastName);
    user.password = faker.random.alphaNumeric(64);
    user.location = `${city}, ${state}`;

    return user;
  }
}
