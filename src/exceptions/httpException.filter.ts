import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common'
import { Request, Response } from 'express'

import { InvalidAccountException } from '@/exceptions/invalidAccountException.exception'

@Catch(InvalidAccountException)
export class InvalidAccountExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidAccountException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status = exception.getStatus()
    const { message, errorCode } = exception.getResponse() as any

    // Customizing the returning response
    response.status(status).json({
      statusCode: status,
      errorCode: errorCode, // Custom code (1001)
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    })
  }
}
