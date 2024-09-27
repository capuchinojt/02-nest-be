import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'

import { AuthService } from '@/auth/auth.service'
import { CreateAuthDto } from '@/auth/dto/create-auth.dto'
import { LocalAuthGuard } from '@/auth/passport/local-auth.guard'
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard'
import { Public } from '@/decorator/customize'

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
  @Public()
  signIn(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto.email, createAuthDto.password)
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: any) {
    return req.user
  }
}
