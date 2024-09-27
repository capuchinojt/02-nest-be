import { IsEmail, IsNotEmpty, IsOptional } from "class-validator"

export class CreateAuthDto {
  @IsNotEmpty({message: 'Email is should not be empty'})
  @IsEmail({}, {message: 'Email is not valid'})
  email: string

  @IsNotEmpty({message: 'Password is should not be empty'})
  password: string

  @IsOptional()
  name: string
}