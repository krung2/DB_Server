import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormConfig } from './config/ormConfig';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { HateModule } from './hate/hate.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), PostModule, LikeModule, HateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
