import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { Token } from 'src/libs/decorator/token.decorator';
import { IUser } from 'src/libs/interface/IUser';
import { returnLib } from 'src/libs/return.lib';
import CheckGaurd from 'src/middleware/check.middleware';
import PostEntity from 'src/models/post.entity';
import { AddPostDto } from './dto/addPost.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

  constructor(
    private readonly postService: PostService
  ) { }

  @Post()
  @UseGuards(new CheckGaurd())
  async addPost(
    @Body() addPostDto: AddPostDto,
    @Token() tokenUser?: IUser,
  ) {

    await this.postService.addPost(addPostDto, tokenUser);

    return returnLib(201, '게시글 게시 성공');
  }

  @Get()
  async getAllPost() {

    const Posts: PostEntity[] = await this.postService.getAllPost();

    return returnLib(200, '게시글 모두 불러오기 성공', Posts);
  }

  @Get('/:idx')
  async getPost(
    @Param('idx') idx: number
  ) {

    const post: PostEntity = await this.postService.getPost(idx);

    return returnLib(200, '특정 게시글 불러오기 성공', post);
  }
}
