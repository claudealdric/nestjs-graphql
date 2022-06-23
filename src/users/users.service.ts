import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getUserById(id: number): Promise<User> {
    return this.usersRepository.findOneOrFail(id);
  }
}