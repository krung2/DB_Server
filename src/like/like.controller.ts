import { Controller, Delete, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Token } from 'src/libs/decorator/token.decorator';
import { IUser } from 'src/libs/interface/IUser';
import { returnLib } from 'src/libs/return.lib';
import AuthGaurd from 'src/middleware/auth.middleware';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {

  constructor(
    private readonly likeService: LikeService,
  ) { }

  @Post('/:idx')
  async addLike(
    @Query('token') token: string,
    @Param('idx') idx: number,
  ) {

    await this.likeService.addLike(token, idx);

    return returnLib(201, '좋아요 성공');
  }

  @Delete('/:idx')
  @UseGuards(new AuthGaurd())
  async delLike(
    @Token() tokenUser: IUser,
    @Param('idx') idx: number,
  ) {

    await this.likeService.delLike(tokenUser, idx);

    return returnLib(200, '좋아요 삭제 성공');
  }
}
