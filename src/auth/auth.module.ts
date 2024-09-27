import { Module } from '@nestjs/common'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from '@/auth/auth.controller'
import { AuthService } from '@/auth/auth.service'

import { ConfigService } from '@/config/config.service'
import { ConfigModule } from '@/config/config.module'

import { UsersModule } from '@/modules/users/users.module'
import { LocalStrategy } from '@/auth/passport/local.strategy'
import { JwtStrategy } from '@/auth/passport/jwt.strategy'

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const jwtConfig = configService.get<string>('jwt')
        console.log('config:: jwtConfig: ', jwtConfig)
        return {
          global: true,
          secret: jwtConfig['secret'],
          signOptions: {
            expiresIn: jwtConfig['expiresIn'],          
          }
        } as JwtModuleOptions
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
