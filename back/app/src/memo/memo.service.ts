import { Injectable, NotFoundException } from '@nestjs/common';
import { Memo } from './entities/Memo.entity';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MemoService {
    constructor(
        @InjectRepository(Memo)
        private memoRepository: Repository<Memo>, //hack : type을 명시해주는 이유를 모르겠음
    ){}
    private memos:Memo[] = [];

    getAll(): Promise<Memo[]>{
        return this.memoRepository.find();
    }

    getOne(id:number):Promise<Memo | null>{
        const memo = this.memoRepository.findOneBy({id});
        if(!memo){
            throw new NotFoundException(`Movie ID 존재하지 않음 : ${id}`);
        }
        return memo;
    }

    async deleteOne(id:number):Promise<void>{
        await this.memoRepository.delete(id);
    }

    async create(memoData:CreateMemoDto):Promise<void>{
        const memo = this.memoRepository.create(memoData);
        await this.memoRepository.save(memo);
    }

    // update(id:number, memoData:UpdateMemoDto):boolean{
    //     const memo = this.getOne(id);
    //     this.deleteOne(id);
    //     this.memos.push({...memo, ...memoData});
    //     return true;
    // }
}
