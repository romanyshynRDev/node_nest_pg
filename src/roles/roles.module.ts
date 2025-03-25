import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Roles } from './role.model';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { User } from 'src/users/user.model';
import { UserRoles } from './user-roles.model';

@Module({
    providers: [RolesService],
    controllers: [RolesController],
    imports: [
        SequelizeModule.forFeature([Roles, User, UserRoles])
    ],
    exports:[
        RolesService
    ]
})
export class RolesModule { }
