import { IsEmail, IsEmpty, IsNotEmpty, IsPhoneNumber } from 'class-validator'

export class CreateUserDto {
  @(IsNotEmpty({ message: 'Name is should not be empty' }))
  name: string

  @IsNotEmpty({ message: 'Email is should not be empty' })
  @IsEmail({}, { message: 'Email is not valid' })
  email: string

  @IsNotEmpty({ message: 'Password is should not be empty' })
  password: string

  @IsPhoneNumber('VN', { message: 'Phone number is not valid' })
  phone: string

  address: string

  image: string
}
