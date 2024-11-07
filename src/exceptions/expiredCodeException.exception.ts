import { ERROR_CODES } from '@/auth/constants/error.type'
import { HttpException, HttpStatus } from '@nestjs/common'

export class ExpiredCodeException extends HttpException {
  constructor() {
    super({ message: 'Verification code has expired.', errorCode: ERROR_CODES.INVALID_VERIFY_CODE }, HttpStatus.BAD_REQUEST)
  }
}
