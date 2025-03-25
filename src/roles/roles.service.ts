import { InjectModel } from '@nestjs/sequelize';
import { createRoleDTO } from './dto/create-role-dto';
import { Injectable } from '@nestjs/common';

import { Roles } from './role.model';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Roles) private roleRepository: typeof Roles) {

    }

    async createRole(dto: createRoleDTO) {
        const role = await this.roleRepository.create(dto)
        return role
    }
    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({ where: { value } })
        return role
    }
}
