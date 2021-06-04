import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Hate from 'src/models/hate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HateService {

  constructor(
    @InjectRepository(Hate)
    private hateRepository: Repository<Hate>
  ) { }


}
