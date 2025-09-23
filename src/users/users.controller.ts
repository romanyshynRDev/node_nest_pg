import { UsersService } from './users.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { createUserDto } from './dto/create-user-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
//Responsible for https requests

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private UsersService: UsersService) {

    }
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() userDto: createUserDto) {
        return this.UsersService.createUser(userDto)
    }
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.UsersService.getAllUsers()
    }
}
