import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule, ConfigService as NestConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { ConfigModule } from './config/config.module'
import { ConfigService } from './config/config.service'

/*
  Using ConfigModule to get config from .env file
  https://docs.nestjs.com/techniques/configuration
*/
@Module({
  imports: [
    UserModule,
    ConfigModule,
    /**
      START - Import MongooseModule to connect to MongoDB
      https://docs.nestjs.com/techniques/mongodb#async-configuration
    **/
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get<string>('database')
        return {
          uri: dbConfig['uri'],
        }
      },
      inject: [ConfigService],
    }),
    // END - Import MongooseModule to connect to MongoDB
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
