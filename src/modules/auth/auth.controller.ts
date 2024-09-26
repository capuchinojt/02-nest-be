import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'

import { AuthService } from '@/modules/auth/auth.service'
import { CreateAuthDto } from '@/modules/auth/dto/create-auth.dto'
import { LocalAuthGuard } from '@/modules/auth/passport/local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async handleLogin(@Request() req: any) {
    return this.authService.login(req.user)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto.email, createAuthDto.password)
  }
}
