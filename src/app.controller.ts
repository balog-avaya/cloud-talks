import { BadRequestException, Controller, Get, InternalServerErrorException, Post, Query, Param } from "@nestjs/common";
import { AppService } from "./app.service";
import { GetMaciDto } from "./get-maci.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }


  @Get('maci/:lastName/:firstName')
  getMaciByParam(@Param() input: GetMaciDto): string {
    return this.appService.processGreeting(`${input.firstName}, ${input.lastName}`);
  }

  @Get('maci')
  getMaciByQuery(@Query() input: GetMaciDto): string {
    return this.appService.processGreeting(`${input.firstName}, ${input.lastName}`);
  }


  @Post('maci')
  postHello(): string {
    return this.appService.postHello('ATTILA2');
  }
}
