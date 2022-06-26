import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../user.entity';

@InputType()
export class UserInput
  implements
    Pick<User, 'firstName' | 'lastName' | 'username' | 'email' | 'password'>
{
  @Field()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Field({ nullable: true })
  @IsOptional()
  lastName?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;
}
