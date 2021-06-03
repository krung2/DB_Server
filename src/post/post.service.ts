import { Injectable } from '@nestjs/common';
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
}
