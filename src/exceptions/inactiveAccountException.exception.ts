import { ERROR_CODES } from '@/auth/constants/error.type'
import { HttpException, HttpStatus } from '@nestjs/common'

export class InactiveAccountException extends HttpException {
  constructor() {
    super({ message: 'Your account is not active. Please verify your account.', errorCode: ERROR_CODES.INACTIVE_ACCOUNT }, HttpStatus.UNAUTHORIZED)
  }
}
