import { Module } from '@nestjs/common'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'

import { AuthController } from '@/modules/auth/auth.controller'
import { AuthService } from '@/modules/auth/auth.service'
import { UsersModule } from '@/modules/users/users.module'
import { ConfigModule } from '@/config/config.module'
import { ConfigService } from '@/config/config.service'

@Module({
  imports: [
    UsersModule,
    ConfigModule,
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
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
