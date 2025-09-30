
import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Roles } from "src/roles/role.model";
import { UserRoles } from "src/roles/user-roles.model";
import { User } from "src/users/user.model";


interface PostsCreationAttr {
    title: string;
    content: string;
    userId: number;
    image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostsCreationAttr> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    declare title: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare content: string;

    @Column({ type: DataType.STRING })
    declare image: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    declare userId: number;

    @BelongsTo(() => User)
    declare author: User
}