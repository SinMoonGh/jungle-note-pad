import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MemoService {
    private memos:Memo[] = [];

    getAll():Memo[]{
        return this.memos;
    }

    getOne(id:number):Meme{
        const memo = this.memos.find(movie => movie.id === +id);
        if(!memo){
            throw new NotFoundException(`Movie ID 존재하지 않음 : ${id}`);
        }
        return memo;
    }

    deleteOne(id:number):boolean{
        this.getOne(id);
        this.memos.filter(memo)
    }
}
