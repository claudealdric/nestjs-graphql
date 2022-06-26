import { BaseEntity } from '../shared/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  location: string;

  @OneToMany(() => Post, (post) => post.user, { nullable: true })
  posts: Post[];
}
