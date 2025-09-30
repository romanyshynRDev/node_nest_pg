import { PostsService } from './posts.service';
import { createPostDto } from './dto/create.post.dto';
import { Body, Controller, Post, UploadedFile } from '@nestjs/common';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) { }

    @Post()
    createPost(@Body() dto: createPostDto, @UploadedFile() image) {
       return this.postService.create(dto, image)
    }
}
