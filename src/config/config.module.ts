import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config'
import { ConfigService as AppConfigService } from './config.service'
import configuration from './configuration'
import { validate } from './env.validation'

@Module({
  imports: [
    NestConfigModule.forRoot({
      validate,
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  providers: [
    {
      provide: AppConfigService,
      useFactory: (configService: ConfigService) => {
        const config = configuration(configService)
        return new AppConfigService(config)
      },
      inject: [ConfigService],
    },
  ],
  exports: [AppConfigService],
})
export class ConfigModule {}
