import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { MailerModule } from '@nestjs-modules/mailer'
import { APP_GUARD } from '@nestjs/core'

import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { ConfigModule } from '@/config/config.module'
import { ConfigService } from '@/config/config.service'
import { LikesModule } from '@/modules/likes/likes.module'
import { MenuItemOptionsModule } from '@/modules/menu.item.options/menu.item.options.module'
import { MenuItemsModule } from '@/modules/menu.items/menu.items.module'
import { OrdersModule } from '@/modules/orders/orders.module'
import { OrderDetailModule } from '@/modules/order.detail/order.detail.module'
import { RestaurantsModule } from '@/modules/restaurants/restaurants.module'
import { ReviewsModule } from '@/modules/reviews/reviews.module'
import { UsersModule } from '@/modules/users/users.module'
import { AuthModule } from '@/auth/auth.module'
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard'

/*
  Using ConfigModule to get config from .env file
  https://docs.nestjs.com/techniques/configuration
*/
@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UsersModule,
    LikesModule,
    MenuItemsModule,
    MenuItemOptionsModule,
    OrdersModule,
    OrderDetailModule,
    RestaurantsModule,
    ReviewsModule,
    /**
      START - Import MongooseModule to connect to MongoDB
      https://docs.nestjs.com/techniques/mongodb#async-configuration
    **/
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.databaseConfig['uri'],
      }),
      inject: [ConfigService],
    }),
    // END - Import MongooseModule to connect to MongoDB
    // START - Import MailerModule
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: configService.mailerConfig['user'],
            pass: configService.mailerConfig['pass'],
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
        // preview: true,
        template: {
          dir: process.cwd() + '/src/mail/templates/',
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    })
    // END - Import MailerModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Provide the APP_GUARD token for all modules
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
