import { ConfigService } from '@nestjs/config'

import { Config } from '@/config/interfaces/config.interface'

export default (configService: ConfigService): Config => ({
  environment: configService.get<string>('NODE_ENV'),
  port: configService.get<number>('PORT', 3000),
  database: {
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT', 5432),
    username: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    name: configService.get<string>('DATABASE_NAME'),
    uri: configService.get<string>('DATABASE_URI'),
  },
  jwt: {
    secret: configService.get<string>('JWT_SECRET'),
    expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
  },
  mailer: {
    user: configService.get<string>('MAILDEV_INCOMING_USER'),
    pass: configService.get<string>('MAILDEV_INCOMING_PASS'),
  },
  codeExpired: {
    value: configService.get<number>('CODE_EXPIRATION_VALUE'),
    unit: configService.get<string>('CODE_EXPIRED_UNIT'),
  },
})
