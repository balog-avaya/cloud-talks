import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  processGreeting(name: string): string {
    return 'Hello World for you, dear ' + name;
  }

  postHello(name: string): string {
    return 'POST HELLO NEKED KEDVES ' + name;
  }
}
