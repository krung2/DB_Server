import { Controller } from '@nestjs/common';
import { HateService } from './hate.service';

@Controller('hate')
export class HateController {

  constructor(
    private readonly hateService: HateService,
  ) { }


}
