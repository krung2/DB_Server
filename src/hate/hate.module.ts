import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Hate from 'src/models/hate.entity';
import Post from 'src/models/post.entity';
import { HateController } from './hate.controller';
import { HateService } from './hate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hate, Post]),
  ],
  controllers: [HateController],
  providers: [HateService]
})
export class HateModule { }
