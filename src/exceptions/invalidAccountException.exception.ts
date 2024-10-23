import { ERROR_CODES } from '@/auth/constants/error.type'
import { HttpException, HttpStatus } from '@nestjs/common'

export class InvalidAccountException extends HttpException {
  constructor() {
    super({ message: 'Username or password is incorrect. Please try again.', errorCode: ERROR_CODES.INVALID_LOGIN_CREDENTIALS }, HttpStatus.UNAUTHORIZED)
  }
}
