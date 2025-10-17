import { Module } from '@nestjs/common';
import { modules } from '.';

@Module({
  imports: modules,
})
export class AppModule {}
