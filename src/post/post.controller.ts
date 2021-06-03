import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { Token } from 'src/libs/decorator/token.decorator';
import { IUser } from 'src/libs/interface/IUser';
import { returnLib } from 'src/libs/return.lib';
import CheckGaurd from 'src/middleware/check.middleware';
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
}
