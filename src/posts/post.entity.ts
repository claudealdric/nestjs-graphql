import { BaseEntity } from '../shared/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Post extends BaseEntity {
  @Column({ nullable: true })
  title: string;

  @Column({ length: 280 })
  body: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User;
}
