import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

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

  private async seedUsers(): Promise<void> {
    const users: User[] = [];
    for (let i = 0; i < 50; i += 1) {
      const newUser = this.createFakeUser();
      users.push(newUser);
    }
    await this.usersRepository.save(users);
  }

  private createFakeUser(): User {
    const user = this.usersRepository.create();
    user.firstName = faker.name.firstName();
    if (Math.random() > 0.2) {
      user.lastName = faker.name.lastName();
    }
    return user;
  }
}
