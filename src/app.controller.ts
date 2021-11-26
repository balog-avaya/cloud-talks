import { BadRequestException, Controller, Get, InternalServerErrorException, Post, Query, Param, Body } from "@nestjs/common";
import { AppService } from "./app.service";
import { GetMaciDto } from "./get-maci.dto";
import { PostMaciDto } from "./post-maci.dto";
import { PostMaciResponse } from "./post-maci.response";


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
  postHello(@Body() dto: PostMaciDto): PostMaciResponse {

    return this.appService.postMaci(dto);
  }
}
