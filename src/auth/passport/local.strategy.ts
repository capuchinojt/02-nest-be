import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'

import { AuthService } from '@/auth/auth.service'

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
      throw new UnauthorizedException('Username or password is incorrect.')
    }

    if (!user?.isActive) {
      throw new BadRequestException('Please activate your account first.')
    }
    return user
  }
}
