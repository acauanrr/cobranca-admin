import { Module } from '@nestjs/common';
import { SitacService } from './sitac.service';
import { SitacController } from './sitac.controller';

@Module({
  providers: [SitacService],
  controllers: [SitacController]
})
export class SitacModule {}
