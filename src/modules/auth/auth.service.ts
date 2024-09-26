import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { comparePassword } from '@/helpers/util'
import { UsersService } from '@/modules/users/users.service'
import { User } from '@/modules/users/schemas/user.schema'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  /**
   * Authenticates a user by their email and password.
   *
   * @param email The email of the user to authenticate.
   * @param userPassword The password of the user to authenticate.
   * @returns The authenticated user without the password.
   * @throws {UnauthorizedException} If the email or password is incorrect.
   */
  async signIn(email: string, userPassword: string): Promise<any> {
    try {
      const user = await this.usersService.findUserByEmail(email)
      const isValidPassword = await comparePassword(
        userPassword,
        user?.password
      )
      if (!isValidPassword) {
        throw new UnauthorizedException('Username or password is incorrect.')
      }
      const payload = { sub: user._id, username: user.email }

      return {
        accessToken: await this.jwtService.signAsync(payload),
      }
    } catch (error) {
      console.log('Error while authenticating user. Error:: ', error)
      throw new UnauthorizedException('Username or password is incorrect.')
    }
  }

  async validateUser(
    email: string,
    userPassword: string
  ): Promise<User | null> {
    const user = await this.usersService.findUserByEmail(email)
    console.log('---validateUser - user:: ', user)
    const isValidPassword = await comparePassword(userPassword, user?.password)
    if (user && isValidPassword) {
      const {password, ...userInfo} = user
      return userInfo as User
    }
    return null
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user._id}
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
