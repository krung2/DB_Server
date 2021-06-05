import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'src/libs/interface/IUser';
import Hate from 'src/models/hate.entity';
import { PostService } from 'src/post/post.service';
import { Repository } from 'typeorm';

@Injectable()
export class HateService {

  constructor(
    @InjectRepository(Hate)
    private hateRepository: Repository<Hate>,
    private readonly postService: PostService,
  ) { }

  async addLike(tokenUser: IUser, postIdx: number): Promise<void> {

    const createLike = this.hateRepository.create();

    createLike.userId = tokenUser.name;

    await this.hateRepository.save(createLike);

  }

  async delLike(tokenUser: IUser, postIdx: number): Promise<void> {

    await this.postService.getPostByIdx(postIdx);

    const { name } = tokenUser;

    const hate: Hate | undefined = await this.hateRepository.createQueryBuilder()
      .where('user_id = :name', { name })
      .where('post_idx = :postIdx', { postIdx })
      .getOne();

    if (hate === undefined) {

      throw new NotFoundException('없는 좋아요 입니다');
    }

    await this.hateRepository.delete(hate);
  }
}
