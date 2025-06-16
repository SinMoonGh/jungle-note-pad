import { Module } from '@nestjs/common';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';

@Module({
    imports: [],
    controllers: [MemoController],
    providers: [MemoService],
})
export class MemoModule {}
