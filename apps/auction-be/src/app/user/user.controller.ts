import { IRequest } from '@jitera/common'
import { IsAuthController } from '@jitera/guard'
import { Get, Logger, Req } from '@nestjs/common'
import { UserService } from './user.service'

@IsAuthController('users', 'users')
export class UserController {
  private readonly logger = new Logger(UserController.name)

  constructor(private readonly userService: UserService) {}

  @Get('info')
  getInfo(@Req() req: IRequest) {
    return this.userService.getInfo(req.user)
  }
}
