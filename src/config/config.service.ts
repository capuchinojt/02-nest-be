import { Injectable } from '@nestjs/common'

import { Config } from '@/config/interfaces/config.interface'

@Injectable()
export class ConfigService {
  constructor(private readonly config: Config) {}

  get environment(): string {
    return this.config.environment
  }

  get port(): number {
    return this.config.port
  }

  get databaseConfig(): Config['database'] {
    return this.config.database
  }

  get jwtConfig(): Config['jwt'] {
    return this.config.jwt
  }

  get mailerConfig(): Config['mailer'] {
    return this.config.mailer
  }

  get codeExpirationConfig(): Config['codeExpired'] {
    return this.config.codeExpired
  }

  get<T>(key: keyof Config): T {
    return this.config[key] as T
  }
}
