import { plainToClass } from 'class-transformer'
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator'

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment

  @IsNumber()
  PORT: number

  @IsString()
  DATABASE_HOST: string

  @IsNumber()
  DATABASE_PORT: number

  @IsString()
  DATABASE_USERNAME: string

  @IsString()
  DATABASE_PASSWORD: string

  @IsString()
  DATABASE_NAME: string

  @IsString()
  JWT_SECRET: string

  @IsString()
  JWT_EXPIRES_IN: string
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validatedConfig, { skipMissingProperties: true })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}
