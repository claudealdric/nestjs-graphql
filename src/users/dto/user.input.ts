import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../user.entity';

@InputType()
export class UserInput implements Omit<User, 'id'> {
  @Field()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;
}
