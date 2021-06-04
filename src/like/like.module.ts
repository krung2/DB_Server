import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Like from 'src/models/like.entity';
import Post from 'src/models/post.entity';
import { PostModule } from 'src/post/post.module';
import { PostService } from 'src/post/post.service';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like, Post]),
  ],
  controllers: [LikeController],
  providers: [
    LikeService,
    PostService,
  ]
})
export class LikeModule { }
