export interface Config {
  environment: string
  port: number
  database: {
    host: string
    port: number
    username: string
    password: string
    name: string
    uri: string
  }
  jwt: {
    secret: string
    expiresIn: string
  }
  mailer: {
    user: string
    pass: string
  }
  codeExpired: {
    value: number
    unit: string
  }
}
