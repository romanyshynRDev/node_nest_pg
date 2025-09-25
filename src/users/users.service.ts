import { CreateUserDto } from './dto/create-user-dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role-dto';

//Business logic
@Injectable() //Allow us to use that service in controller trought the Dependency Injection (DI).
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {

    }
    //Used only to create a user
    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue('ADMIN')
        if (!role) {
            throw new HttpException('Role USER not found', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        await user.$set('roles', [role.id])
        user.roles = [role]
        console.log('user', user, role)
        return user

    }
    async getAllUsers() {
        const users = await this.userRepository.findAll({ include: { all: true } })
        return users
    }
    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email }, include: { all: true } })
        return user
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        console.log('dto', dto)
        if (!dto.role) {
            throw new HttpException('Role value is required', HttpStatus.BAD_REQUEST);
        }
        const role = await this.roleService.getRoleByValue(dto.role)
        if (role && user) {
            await user.$add('role', role.id)
            return dto
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }

    async restrictUser(dto: AddRoleDto) {

    }
}
