import { Controller, Post } from '@nestjs/common';
import { Token } from 'src/libs/decorator/token.decorator';
import { IUser } from 'src/libs/interface/IUser';
import { returnLib } from 'src/libs/return.lib';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {

  constructor(
    private readonly likeService: LikeService,
  ) { }

  @Post()
  async addLike(
    @Token() tokenUser: IUser,
  ) {

    await this.likeService.addLike(tokenUser);

    return returnLib(201, '좋아요 성공');
  }
}
