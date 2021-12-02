import { BadRequestException, Controller, Get, InternalServerErrorException, Post, Query, Param, Body } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { GetMaciDto } from "./get-maci.dto";
import { PostMaciDto } from "./post-maci.dto";
import { PostMaciResponse } from "./post-maci.response";

@ApiTags('tag')
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
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: PostMaciResponse,
  })
    postHello(@Body() dto: PostMaciDto): PostMaciResponse {

    return this.appService.postMaci(dto);
  }
}
