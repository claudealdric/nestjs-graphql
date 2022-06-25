import { BaseEntity } from '../shared/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName?: string;
}
