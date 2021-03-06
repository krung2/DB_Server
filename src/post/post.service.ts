import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetPost, GetPosts } from 'src/libs/interface/IPost';
import { IUser } from 'src/libs/interface/IUser';
import Hate from 'src/models/hate.entity';
import Like from 'src/models/like.entity';
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

  async getAllPost(token: string): Promise<GetPosts[]> {

    const posts: GetPost[] = await this.postRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.like', 'like')
      .leftJoinAndSelect('post.hate', 'hate')
      .orderBy('post.createdAt', 'DESC')
      .getMany();

    for (const post of posts) {

      post.likeCount = post.like.length;
      post.hateCount = post.hate.length;

      post.isExistLike = true;
      post.isExistHate = true;

      post.like.map((like: Like) => {
        const { userIp, createdAt } = like;

        if (token === userIp) {

          const now = new Date();

          now.setDate(now.getDate() + 1);

          if (createdAt < now) {

            post.isExistLike = false;
          }
        }
      })

      // post.hate.map((hate: Hate) => {
      //   const { userId } = hate;

      //   if (userId === tokenUser.name) {

      //     post.isExistLike = true;
      //     return;
      //   }
      // })
    }

    return posts;
  }

  async getPost(idx: number, tokenUser: IUser): Promise<Post> {

    const post: GetPost | undefined = await this.postRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.like', 'like')
      .leftJoinAndSelect('post.hate', 'hate')
      .where('post.idx = :idx', { idx })
      .getOne();

    if (post === undefined) {

      throw new NotFoundException('없는 게시글입니다');
    }

    post.likeCount = post.like.length;
    post.hateCount = post.hate.length;

    post.isExistLike = true;
    post.isExistHate = true;

    if (tokenUser === undefined) {

      return post;
    }

    post.isExistLike = false;
    post.isExistHate = false;

    post.like.map((like: Like) => {
      const { userIp } = like;

      if (userIp === tokenUser.name) {

        post.isExistLike = true;
        return;
      }
    })

    post.hate.map((hate: Hate) => {
      const { userId } = hate;

      if (userId === tokenUser.name) {

        post.isExistLike = true;
        return;
      }
    })

    return post;
  }

  public async getPostByIdx(idx: number): Promise<Post> {

    const post: Post | undefined = await this.postRepository.createQueryBuilder()
      .where('idx = :idx', { idx })
      .getOne();

    if (post === undefined) {

      throw new NotFoundException('없는 게시글 입니다');
    }

    return post;
  }
}
