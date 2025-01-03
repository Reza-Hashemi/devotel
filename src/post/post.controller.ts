import { Body, Controller, Delete, Get, Param, Post, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, FindPostDto } from './dto/post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadOptions } from 'src/config/fileManager';
import { Role } from 'src/entities/role.entity';
import { Roles } from 'src/common/guard/role.decorator';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get()
  async find(@Query() data: FindPostDto) {
    return await this.postService.getPosts(data)
  }
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.postService.getPost(+id)
  }
  @Post()
  @UseInterceptors(FileInterceptor('image', uploadOptions))
  async create(@Req() req: any, @UploadedFile() image: Express.Multer.File, @Body() data: CreatePostDto) {
    return await this.postService.createPost(data, image.filename, req.userId)
  }
  @Delete(":id")
  async delete(@Req() req: any, @Param("id") id: string) {
    return await this.postService.deletePost(+id, req.userId)
  }

  @Post("createRole")
  // @Roles(['admin', 'operator'])
  async createRole(@Body() data: any) {
    return await this.postService.createRole(data)
  }
  @Post("createUser")
  async createUser(@Body() data: any) {
    return await this.postService.createUser(data)
  }
}
