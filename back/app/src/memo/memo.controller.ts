import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { MemoService } from './memo.service';
import { Memo } from './entities/Memo.entity';

@Controller('memo')
export class MemoController {
    constructor(private readonly memoService:MemoService){}

    @Get()
    getAll():Memo[]{
        return this.memoService.getAll();
    }

    @Get("search")
    search(@Query('name') searchingMemo:string){
        return `search for a memo ${searchingMemo}`;
    }

    @Get(":id")
    getOne(@Param('id') id:number){
        return this.memoService.getOne(id);
    }

    @Post()
    create(@Body() memoData){
        return this.memoService.create(memoData);
    }

    @Delete(':id')
    delete(@Param('id') id:number){
        return this.memoService.deleteOne(id);
    }

    @Patch(':id')
    patch(@Param('id') id:number, @Body() upData){
        return this.memoService.update(id, upData)
    }
}
