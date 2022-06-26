import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
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

  @Field()
  @IsNotEmpty()
  @IsString()
  lastName: string;

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
