import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        try {
            const authHeader = request.headers.authorization;
            if (!authHeader) {
                throw new UnauthorizedException({ message: 'User is not authorized' });
            }
            const [bearer, token] = authHeader.split(' ');
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'User is not authorized' });
            }
            const user = this.jwtService.verify(token, { secret: process.env.PRIVATE_KEY });
            request.user = user;
            return true;
        } catch {
            throw new UnauthorizedException({ message: 'Something went wrong!' });
        }
    }
}