import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Roles } from './role.model';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
    providers: [RolesService],
    controllers: [RolesController],
    imports: [
        SequelizeModule.forFeature([Roles])
    ]
})
export class RolesModule { }
