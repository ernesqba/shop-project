import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  working(): string {
    return new Date().toISOString();
  }
}
