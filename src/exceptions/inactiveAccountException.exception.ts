import { HttpException, HttpStatus } from '@nestjs/common'

export class InactiveAccountException extends HttpException {
  constructor() {
    super('Your account is not active. Please verify your account.', HttpStatus.UNAUTHORIZED)
  }
}
