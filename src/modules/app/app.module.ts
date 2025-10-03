import { Module } from '@nestjs/common';
import { AppModules } from '@/modules/app/module';

@Module({
  imports: AppModules,
})
export class AppModule {}
