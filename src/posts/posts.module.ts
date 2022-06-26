import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Post } from './post.entity';
import { PostsResolver } from './post.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  providers: [PostsService, PostsResolver],
  exports: [PostsService],
})
export class PostsModule {}
