import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

import { AuthService } from '@/auth/auth.service'
import { CreateAuthDto } from '@/auth/dto/create-auth.dto'
import { LocalAuthGuard } from '@/auth/passport/local-auth.guard'
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard'
import { Public } from '@/decorator/customize'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService
  ) {}

  @Post('login')
  @Public()
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

  @Post('register')
  @Public()
  register(@Body() registerDto: CreateAuthDto) {
    return this.authService.handleRegister(registerDto)
  }

  @Get('mail')
  @Public()
  sendMail() {
    this.mailerService
      .sendMail({
        to: 'dev.mailer.test.11@gmail.com', // list of receivers
        subject: 'Activate your account at NestApp', // Subject line
        template: "register",
        context: {
          name: 'NestApp',
          url: 'https://google.com',
          activationCode: '123456'
        }
      })
      .then(() => {
        console.log('Send mail OK!!')
      })
      .catch((error) => {
        console.log('Error when send email. Error:: ', error)
      });
    return "Send mail OK!!"
  }
}
