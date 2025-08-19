import { Controller, ForbiddenException, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getData() {
    throw new ForbiddenException();
  }
}
