import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { createUserDto } from './dto/create-user-dto';
//Responsible for https requests
@Controller('users')
export class UsersController {

    constructor(private UsersService: UsersService) {

    }

    @Post()
    create(@Body() userDto: createUserDto) {
        return this.UsersService.createUser(userDto)
    }
    @Get()
    getAll() {
        return this.UsersService.getAllUsers()
    }
}
