import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles.auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

            if (!requiredRoles) {
                return true
            }
            const authHeader = request.headers.authorization;
            if (!authHeader) {
                throw new UnauthorizedException({ message: 'User is not authorized' });
            }
            const [bearer, token] = authHeader.split(' ');
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'User is not authorized' });
            }
            const user = this.jwtService.verify(token, { secret: process.env.PRIVATE_KEY || "" });
            request.user = user;
            console.log('user',user)
            return user.role.some((role: { value: string; }) => requiredRoles.includes(role.value));
        } catch (e) {
            console.log('error', e)
            throw new HttpException('No access', HttpStatus.FORBIDDEN);
        }
    }
}