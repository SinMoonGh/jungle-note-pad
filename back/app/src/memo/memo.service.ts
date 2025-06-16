import { Injectable, NotFoundException } from '@nestjs/common';
import { Memo } from './entities/Memo.entity';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';

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

    create(memoData:CreateMemoDto):boolean{
        this.memos.push({
            id: this.memos.length + 1,
            ...memoData,
        })
        return true;
    }

    update(id:number, memoData:UpdateMemoDto):boolean{
        const memo = this.getOne(id);
        this.deleteOne(id);
        this.memos.push({...memo, ...memoData});
        return true;
    }
}
