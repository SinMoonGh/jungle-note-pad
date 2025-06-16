import { Injectable, NotFoundException } from '@nestjs/common';
import { Memo } from './entities/Memo.entity';

@Injectable()
export class MemoService {
    private memos:Memo[] = [];

    getAll():Memo[]{
        return this.memos;
    }

    getOne(id:number):Memo{
        const memo = this.memos.find(movie => movie.id === +id);
        if(!memo){
            throw new NotFoundException(`Movie ID 존재하지 않음 : ${id}`);
        }
        return memo;
    }

    deleteOne(id:number):boolean{
        this.getOne(id);
        this.memos.filter(memo => memo.id !== +id);
        return true;
    }

    create(memoData):boolean{
        this.memos.push({
            id: this.memos.length + 1,
            ...memoData,
        })
        return true;
    }

    update(id:number, memoData):boolean{
        const memo = this.getOne(id);
        this.deleteOne(id);
        this.memos.push({...memo, ...memoData});
        return true;
    }
}
