import { ApiProperty } from "@nestjs/swagger";
import { AutoIncrement, BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { UserRoles } from './user-roles.model';


interface RoleControllerAttr {
    value: string,
    description: string
}

@Table({ tableName: 'roles' })
export class Roles extends Model<Roles, RoleControllerAttr> {
    @ApiProperty({ example: '1', description: 'User role' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number

    @ApiProperty({ example: 'ADMIN', description: "Admin role email" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    declare value: string

    @ApiProperty({ example: 'ADMINISTRATION', description: "Role description" })
    @Column({ type: DataType.STRING, allowNull: false })
    declare description: string

    @BelongsToMany(() => User, () => UserRoles)
    declare roles: User[]

}