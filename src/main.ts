import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { AppModule } from '@/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  const configService = app.get(ConfigService)
  const PORT = configService.get('PORT')

  // Set the global prefix for all routes to 'api/v1'
  // Exclude empty paths from the prefix
  app.setGlobalPrefix('api/v1', { exclude: [''] })
  // Enable CORS
  app.enableCors()
  // Start the server
  await app.listen(PORT)
}
bootstrap()
