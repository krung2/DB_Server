import { Controller, Delete, InternalServerErrorException, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
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
    @Req() req: Request,
    @Param('idx') idx: number,
  ) {

    const ip: string | string[] = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    if (Array.isArray(ip)) {

      Logger.error(ip);
      throw new InternalServerErrorException('서버 오류');
    }

    await this.likeService.addLike(ip, idx);

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
