import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'src/libs/interface/IUser';
import Like from 'src/models/like.entity';
import Post from 'src/models/post.entity';
import { PostService } from 'src/post/post.service';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {

  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    private readonly postService: PostService
  ) { }

  async addLike(tokenUser: IUser, postIdx: number): Promise<void> {

    // const like: Like | undefined = await this.likeRepository.findOne({
    //   where: {
    //     userId: tokenUser.name,
    //   },
    // });

    // if (like !== undefined) {

    //   throw new ForbiddenException('이미 좋아요를 눌렀습니다');
    // }

    // TODO: post service 하나 찾아오기  쓰기

    const createLike = this.likeRepository.create();

    createLike.userId = tokenUser.name;

    await this.likeRepository.save(createLike);

  }

  async delLike(tokenUser: IUser, postIdx: number): Promise<void> {

    await this.postService.getPostByIdx(postIdx);

    const { name } = tokenUser;

    const like: Like | undefined = await this.likeRepository.createQueryBuilder()
      .where('user_id = :name', { name })
      .where('post_idx = :postIdx', { postIdx })
      .getOne();

    if (like === undefined) {

      throw new NotFoundException('없는 좋아요 입니다');
    }

    await this.likeRepository.delete(like);
  }
}
