import { Roles } from './role.model';
import { ApiProperty } from "@nestjs/swagger";
import {  Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from 'src/users/user.model';




@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
    // @ApiProperty({ example: '1', description: 'User role' })
    // @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    // declare id: number;

    // @ApiProperty({ example: 'ADMIN', description: "Admin role email" })
    @ForeignKey(() => Roles)
    @Column({ type: DataType.INTEGER })
    declare roleId: string;

    // @ApiProperty({ example: 'ADMINISTRATION', description: "Role description" })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    declare userId: string;
}