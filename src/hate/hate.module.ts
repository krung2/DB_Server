import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Hate from 'src/models/hate.entity';
import Post from 'src/models/post.entity';
import { PostService } from 'src/post/post.service';
import { HateController } from './hate.controller';
import { HateService } from './hate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hate, Post]),
  ],
  controllers: [HateController],
  providers: [
    HateService,
    PostService
  ]
})
export class HateModule { }
