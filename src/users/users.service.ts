import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserInput } from './dto/user.input';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  createUser(user: UserInput): Promise<User> {
    return this.usersRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();
    if (users.length < 2) {
      await this.seedUsers();
    }
    return users;
  }

  getUserById(id: number): Promise<User> {
    return this.usersRepository.findOneOrFail(id);
  }

  async updateUserById(id: number, userInput: UserInput): Promise<User> {
    let user = await this.usersRepository.findOneOrFail(id);
    user = { ...user, ...userInput };
    return this.usersRepository.save(user);
  }

  private async seedUsers(): Promise<void> {
    const users: User[] = [];
    for (let i = 0; i < 50; i += 1) {
      const newUser = this.createFakeUser();
      users.push(newUser);
    }
    await this.usersRepository.save(users);
  }

  private createFakeUser(): User {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const city = faker.address.cityName();
    const state = faker.address.stateAbbr();
    const user = this.usersRepository.create();

    user.firstName = firstName;
    user.lastName = lastName;
    user.username = faker.internet.userName();
    user.email = faker.internet.exampleEmail(firstName, lastName);
    user.password = faker.random.alphaNumeric(64);
    user.location = `${city}, ${state}`;
    if (Math.random() > 0.2) {
      user.lastName = faker.name.lastName();
    }
    return user;
  }
}
