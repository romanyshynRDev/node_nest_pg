import { createUserDto } from './dto/create-user-dto';
import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';

//Business logic
@Injectable() //Allow us to use that service in controller trought the Dependency Injection (DI).
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {

    }
    //Used only to create a user
    async createUser(dto: createUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue('USER')
        if (role)
            await user.$set('roles', [role.id])
        return user
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all:true}})
        return users
    }

}
