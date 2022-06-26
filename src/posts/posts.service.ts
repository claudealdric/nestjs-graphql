import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getPosts(): Promise<Post[]> {
    let posts = await this.postsRepository.find();
    if (posts.length === 0) {
      await this.seedPosts();
      posts = await this.postsRepository.find();
    }
    return posts;
  }

  getPostsForUser(userId: number): Promise<Post[]> {
    return this.postsRepository.find({ where: { userId: userId } });
  }

  private async seedPosts(): Promise<void> {
    let userIds = (await this.usersRepository.find({ select: ['id'] })).map(
      (user) => user.id,
    );
    userIds = Array.from(new Set(userIds));
    const posts: Post[] = [];

    for (const userId of userIds) {
      const numberOfPostsToCreate = Math.floor(Math.random() * 3);
      for (let i = 0; i < numberOfPostsToCreate; i++) {
        const newPost = this.createFakePostForUser(userId);
        posts.push(newPost);
      }
    }

    await this.postsRepository.save(posts);
  }

  private createFakePostForUser(userId: number): Post {
    const post = this.postsRepository.create();
    post.title = faker.lorem.words();
    post.body = faker.lorem.paragraph(1);
    post.userId = userId;
    return post;
  }
}
