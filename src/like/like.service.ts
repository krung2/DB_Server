import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Like from 'src/models/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {

  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>
  ) { }


}
