import { BaseEntity } from '../shared/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName?: string;

  @OneToMany(() => Post, (post) => post.user, { nullable: true })
  posts: Post[];
}
