import { HttpException, HttpStatus } from '@nestjs/common'

export class InvalidAccountException extends HttpException {
  constructor() {
    super('Username or password is incorrect. Please try again.', HttpStatus.UNAUTHORIZED)
  }
}
