import { UsersService } from './users.service';
import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/auth/roles.auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role-dto';
import { RestrictUserDto } from './dto/restrict-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
//Responsible for https requests

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private UsersService: UsersService) {

    }
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 200, type: User })
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.UsersService.createUser(userDto)
    }
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.UsersService.getAllUsers()
    }

    @ApiOperation({ summary: 'Get user role' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.UsersService.addRole(dto)
    }

    @ApiOperation({ summary: 'Restrict user' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/restrict')
    restrictUser(@Body() dto: RestrictUserDto) {
        // return this.UsersService.restrictUser(dto)
    }
}
