import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Welcome to the Podcast API!',
      version: '1.0.0',
    };
  }
}
