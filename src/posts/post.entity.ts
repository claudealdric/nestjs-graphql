import { BaseEntity } from '../shared/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  @Column({ nullable: true })
  title: string;

  @Column({ length: 280 })
  body: string;
}
