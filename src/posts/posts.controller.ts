import { PostsService } from './posts.service';
import { createPostDto } from './dto/create.post.dto';
import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) { }

    @Post()
    @UseInterceptors(FileInterceptor ('image'))
    createPost(@Body() dto: createPostDto, @UploadedFile() image) {
    console.log('image =>',dto, image)
       return this.postService.create(dto, image)
    }
}
