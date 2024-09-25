import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateAuthDto {
  @IsNotEmpty({message: 'Username is should not be empty'})
  @IsEmail({}, {message: 'Email is not valid'})
  email: string

  @IsNotEmpty({message: 'Password is should not be empty'})
  password: string
}