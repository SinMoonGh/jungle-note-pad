import { Module } from '@nestjs/common';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from './entities/Memo.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Memo])],
    controllers: [MemoController],
    providers: [MemoService],
})
export class MemoModule {}
