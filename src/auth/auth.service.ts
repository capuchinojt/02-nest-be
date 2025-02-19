import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { comparePassword } from '@/helpers/util'
import { UsersService } from '@/modules/users/users.service'
import { User } from '@/modules/users/schemas/user.schema'
import { CreateAuthDto } from '@/auth/dto/create-auth.dto'
import { ExpiredCodeException, InactiveAccountException, InvalidAccountException, InvalidVerifyCodeException } from '@/exceptions'


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
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
    if (!email || !userPassword) {
      throw new BadRequestException()
    }
    const user = await this.usersService.findUserByEmail(email)

    if (!user) {
      throw new InvalidAccountException()
    }

    const isValidPassword = await comparePassword(userPassword, user?.password)
    if (!isValidPassword) {
      throw new InvalidAccountException()
    }

    if (user?.isActive === false) {
      throw new InactiveAccountException()
    }

    const payload = { sub: user._id, username: user.email }

    return {
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        isActive: user.isActive,
        role: user.role,
      },
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

  async validateUser(
    email: string,
    userPassword: string
  ): Promise<User | null> {
    const user = await this.usersService.findUserByEmail(email)
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

  async handleRegister(registerDto: CreateAuthDto) {
    return await this.usersService.handleRegister(registerDto)
  }

  async verifyAccount(userId: string, verifyCode: string) {
    const userInfo = await this.usersService.findOne(userId)
    if (!userInfo) {
      throw new InvalidAccountException()
    }

    if (userInfo.codeId !== verifyCode) {
      throw new InvalidVerifyCodeException()
    }

    const now = new Date()
    if (now > userInfo.codeExpired) {
      throw new ExpiredCodeException()
    }

    return await this.login(userInfo)
  }
}
