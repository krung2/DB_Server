import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { Token } from 'src/libs/decorator/token.decorator';
import { IUser } from 'src/libs/interface/IUser';
import { returnLib } from 'src/libs/return.lib';
import AuthGaurd from 'src/middleware/auth.middleware';
import { HateService } from './hate.service';

@Controller('hate')
export class HateController {

  constructor(
    private readonly hateService: HateService,
  ) { }

  @Post('/:idx')
  @UseGuards(new AuthGaurd())
  async addLike(
    @Token() tokenUser: IUser,
    @Param('idx') idx: number,
  ) {

    await this.hateService.addLike(tokenUser, idx);

    return returnLib(201, '좋아요 성공');
  }

  @Delete('/:idx')
  @UseGuards(new AuthGaurd())
  async delLike(
    @Token() tokenUser: IUser,
    @Param('idx') idx: number,
  ) {

    await this.hateService.delLike(tokenUser, idx);

    return returnLib(200, '좋아요 삭제 성공');
  }
}
