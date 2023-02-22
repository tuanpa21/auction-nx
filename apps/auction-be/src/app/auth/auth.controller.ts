import { GuardUtil, IsAuthController, JwtAtGuard, JwtRtGuard } from '@jitera/guard'
import { ApiPassedRes, IReply, IRequest } from '@jitera/common'
import { Body, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { AuthCheckExistRes, AuthRefreshRes, AuthSignInRes, AuthSignUpRes } from './auth.response'
import { AuthService } from './auth.service'
import { AuthCheckExistDto, AuthSignInDto, AuthSignUpDto } from './auth.validation'

@IsAuthController('auth', 'auth', false)
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly guardUtil: GuardUtil) {}

  @Post('check-exist')
  @ApiPassedRes(AuthCheckExistRes, HttpStatus.OK)
  async checkExist(@Body() data: AuthCheckExistDto): Promise<AuthCheckExistRes> {
    await this.authService.checkExist(data)

    return { message: `This email is valid` }
  }

  @Post('sign-up')
  @ApiPassedRes(AuthSignUpRes, HttpStatus.OK)
  async signUp(@Body() data: AuthSignUpDto, @Res() res: IReply): Promise<AuthSignUpRes> {
    const response = await this.authService.signUp(data)
    if (response.user.password) delete response.user.password

    return this.guardUtil.setCookie(res, response).send({ data: response })
  }

  @Post('sign-in')
  @ApiPassedRes(AuthSignInRes, HttpStatus.OK)
  async signIn(@Body() data: AuthSignInDto, @Res() res: IReply): Promise<AuthSignInRes> {
    const response = await this.authService.signIn(data)
    if (response.user.password) delete response.user.password

    return this.guardUtil.setCookie(res, response).send({ data: response })
  }

  @UseGuards(JwtAtGuard)
  @Post('sign-out')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  async signOut(@Req() req: IRequest, @Res() res: IReply): Promise<void> {
    const accessToken = req.cookies.accessToken || req.headers['authorization']
    await this.authService.signOut(req.user, accessToken)

    return this.guardUtil.setCookie(res, { accessToken: '', refreshToken: '', expireIns: 0, user: {} }).send()
  }

  @UseGuards(JwtRtGuard)
  @Post('refresh-token')
  @ApiBearerAuth()
  @ApiPassedRes(AuthRefreshRes, HttpStatus.OK)
  async refresh(@Req() req: IRequest, @Res() res: IReply): Promise<AuthRefreshRes> {
    const refreshToken = req.cookies.refreshToken || req.headers['authorization']
    const response = await this.authService.refresh(req.user, refreshToken)

    return this.guardUtil.setCookie(res, response).send({ data: response })
  }
}
