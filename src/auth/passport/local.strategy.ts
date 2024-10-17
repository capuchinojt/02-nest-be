import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { BadRequestException, Injectable } from '@nestjs/common'

import { AuthService } from '@/auth/auth.service'
import { InvalidAccountException } from '@/exceptions'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    })
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password)
    if (!user) {
      throw new InvalidAccountException()
    }

    if (!user?.isActive) {
      throw new BadRequestException('Please activate your account first.')
    }
    return user
  }
}
