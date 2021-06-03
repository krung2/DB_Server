import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'src/libs/interface/IUser';
import { returnLib } from 'src/libs/return.lib';
import Post from 'src/models/post.entity';
import { Repository } from 'typeorm';
import { AddPostDto } from './dto/addPost.dto';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) { }

  async addPost(addPostDto: AddPostDto, tokenUser?: IUser) {

    const createPost = this.postRepository.create(addPostDto);

    if (tokenUser === undefined) {

      createPost.name = "ㅇㅇ";
    } else {

      createPost.name = tokenUser.name;
    }

    await this.postRepository.save(createPost);
  }

  async getAllPost(): Promise<Post[]> {

    return this.postRepository.createQueryBuilder()
      .getMany();
  }

  async getPost(idx: number): Promise<Post> {

    const post: Post | undefined = await this.postRepository.createQueryBuilder()
      .where('idx = :idx', { idx })
      .getOne();

    if (post === undefined) {

      throw new NotFoundException('없는 게시글입니다');
    }

    return post;
  }
}
