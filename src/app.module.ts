import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

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

/*
  Using ConfigModule to get config from .env file
  https://docs.nestjs.com/techniques/configuration
*/
@Module({
  imports: [
    ConfigModule,
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
