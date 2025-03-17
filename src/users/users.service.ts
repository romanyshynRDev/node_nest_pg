import { createUserDto } from './dto/create-user-dto';
import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';

//Business logic
@Injectable() //Allow us to use that service in controller trought the Dependency Injection (DI).
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {

    }
    //Used only to create a user
    async createUser(dto: createUserDto) {
        const user = await this.userRepository.create(dto)
        return user
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll()
        return users
    }

}
