import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly repository: Repository<Post>,
  ) {}

  getPostsForUser(userId: number): Promise<Post[]> {
    return this.repository.find({ where: { userId: userId } });
  }
}
