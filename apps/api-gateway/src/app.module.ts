// apps/api-gateway/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SitacModule } from './sitac/sitac.module';
import { Debito, Inscrito, ProcessoAdministrativo } from '@cobranca/core-domain';
import { DebitoModule } from './debito/debito.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-db',
      port: 5432,
      username: 'admin',
      password: 'password123',
      database: 'cobranca_db',
      entities: [Inscrito, Debito, ProcessoAdministrativo],
      synchronize: true,
    }),
    SitacModule,
    DebitoModule, // Apenas uma importação aqui
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
