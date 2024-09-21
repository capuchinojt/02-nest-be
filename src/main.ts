import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { AppModule } from '@/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true
  })
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  const configService = app.get(ConfigService)
  const PORT = configService.get('PORT')
  const DB_URI = configService.get('DATABASE_URI')

  // Set the global prefix for all routes to 'api/v1'
  // Exclude empty paths from the prefix
  app.setGlobalPrefix('api/v1', { exclude: [''] })
  // Enable CORS
  app.enableCors()
  // Start the server
  await app.listen(PORT)

  console.log(`Server is running on: http://localhost:${PORT}`)
  console.log(`Connected to database at: ${DB_URI}`)
}
bootstrap()
