import { Injectable } from '@nestjs/common';
import { PostMaciDto } from './post-maci.dto';
import { PostMaciResponse } from './post-maci.response';

@Injectable()
export class AppService {



  processGreeting(name: string): string {
    return 'Hello World for you, dear ' + name;
  }

  postHello(name: string): string {
    return 'POST HELLO NEKED KEDVES ' + name;
  }

  postMaci(dto: PostMaciDto): PostMaciResponse {

    const resp = PostMaciResponse.fromPostMaciDto(dto);


    console.log(resp);
    
    resp.incBuci();

    return resp;
  }
}
