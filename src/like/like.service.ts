import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'src/libs/interface/IUser';
import Like from 'src/models/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {

  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>
  ) { }

  async addLike(tokenUser: IUser) {

    // const like: Like | undefined = await this.likeRepository.findOne({
    //   where: {
    //     userId: tokenUser.name,
    //   },
    // });

    // if (like !== undefined) {

    //   throw new ForbiddenException('이미 좋아요를 눌렀습니다');
    // }

    const createLike = this.likeRepository.create();

    createLike.userId = tokenUser.name;

    await this.likeRepository.save(createLike);

  }
}
