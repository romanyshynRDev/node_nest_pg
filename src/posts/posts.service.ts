
import { Injectable } from '@nestjs/common';
import { Post } from './posts.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { createPostDto } from './dto/create.post.dto';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post) private postRepository: typeof Post, private fileService: FilesService) { }
    
    async create(dto:createPostDto, image:any) {
        const fileName = await this.fileService.createFile(image)
        const post = await this.postRepository.create({ ...dto, image: fileName });
        return post
    }
}
