import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/shared/base.entity';
import { User } from '../user.entity';

@InputType()
export class UserInput implements Omit<User, 'id' | keyof BaseEntity> {
  @Field()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;
}
