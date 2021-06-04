import { Controller, Param, Post, UseGuards } from '@nestjs/common';
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
  @UseGuards(new AuthGaurd())
  async addLike(
    @Token() tokenUser: IUser,
    @Param('idx') idx: number,
  ) {

    await this.likeService.addLike(tokenUser, idx);

    return returnLib(201, '좋아요 성공');
  }
}
