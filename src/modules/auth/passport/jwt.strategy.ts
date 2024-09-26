import { ConfigService } from '@/config/config.service'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    //   secretOrKey: configService.jwtConfig['secret'],
      secretOrKey: 'temp-jwt',
    })
  }
}
