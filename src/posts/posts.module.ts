import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './posts.model';
import { User } from 'src/users/user.model';
import { FilesModule } from 'src/files/files.module';

//Unite all dependencies
@Module({
    providers: [PostsService],
    controllers: [PostsController],
    imports: [
        SequelizeModule.forFeature([User, Post]),
        FilesModule,
    ],
})
export class PostsModule { }
