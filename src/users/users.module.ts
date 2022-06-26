import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from 'src/posts/posts.module';
import { User } from './user.entity';
import { UsersResolver } from './user.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PostsModule],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
