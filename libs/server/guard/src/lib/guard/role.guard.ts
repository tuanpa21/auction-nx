import { IRequest, Role } from '@jitera/common'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()])
    if (!roles || roles.length === 0) return true

    const request: IRequest = context.switchToHttp().getRequest()

    return roles.includes(request.user?.role)
  }
}
