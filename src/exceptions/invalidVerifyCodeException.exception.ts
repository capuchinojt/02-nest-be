import { ERROR_CODES } from '@/auth/constants/error.type'
import { HttpException, HttpStatus } from '@nestjs/common'

export class InvalidVerifyCodeException extends HttpException {
  constructor() {
    super({ message: 'Invalid verify code. Please try again.', errorCode: ERROR_CODES.INACTIVE_ACCOUNT }, HttpStatus.BAD_REQUEST)
  }
}
