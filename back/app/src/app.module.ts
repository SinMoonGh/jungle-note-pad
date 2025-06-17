import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemoModule } from './memo/memo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from './memo/entities/Memo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',      
      database: 'memo.db',
      entities: [Memo],
      synchronize: true,
    }),
    MemoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}