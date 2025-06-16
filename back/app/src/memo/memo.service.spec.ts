import { Test, TestingModule } from '@nestjs/testing';
import { MemoService } from './memo.service';
import { NotFoundError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

describe('MemoService', () => {
  let service: MemoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemoService],
    }).compile();

    service = module.get<MemoService>(MemoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  ///////////////////////////////////////

  describe("getAll", () => {
    it("sholud return an array", () => {
     const result = service.getAll();

     expect(result).toBeInstanceOf(Array);
    })
 })

 describe("getOne", () => {
   it('moive를 정상적으로 반환합니다', () => {
     service.create({
       title: 'Test Movie',
       description: "Test 샬라샬라",
       createDate: new Date('2023-11-11'),
     })

     const memo = service.getOne(1);
     expect(memo).toBeDefined();
     expect(memo.id).toEqual(1);
   })

   it('id가 존재하지 않으면 error를 출력하는 지 확인합니다', () => {
     expect(() => {
       service.getOne(2);
     }).toThrow(NotFoundException);
   })
 })

 describe("deleteOne", () => {
   it("제대로 delete 됐는 지 확인합니다.", () => {
    service.create({
      title: 'Test Movie',
      description: "Test 샬라샬라",
      createDate: new Date('2023-11-11'),
    })
     
     expect(() => {
       const allMemos = service.getAll();
       service.deleteOne(1);
       const afterDelete = service.getAll();

       expect(afterDelete.length).toEqual(allMemos.length - 1);
     })
   })

   it('404를 뱉는 지 확인합니다.', () => {
     try{
       service.deleteOne(999);
     }catch(e){
       expect(e).toBeInstanceOf(NotFoundException);
     }
   })
 })

 describe('create', ()=> {
   it('모든 멤버가 정확히 생성되는 지 check', () => {
     const beforeCreate = service.getAll().length;
     service.create({
      title: 'Test Movie',
      description: "Test 샬라샬라",
      createDate: new Date('2023-11-11'),
    })

     const afterCreate = service.getAll().length;
     expect(afterCreate).toBe(beforeCreate + 1);
     
     const movie = service.getOne(1);
     expect(movie.title).toEqual('Test Movie');
     expect(movie.description).toEqual('Test 샬라샬라');
     expect(movie.createDate).toEqual(new Date('2023-11-11'));
   })
 })

 describe('update', () => {
   it('Memo 멤버가 update 됐는 지 확인', () => {
    service.create({
      title: 'Test Memo',
      description: "Test 샬라샬라",
      createDate: new Date('2023-11-11'),
    })

     const updateData = {
       title: 'update Memo',
       description: 'Test 샬라샬라',
       createDate: new Date('2023-11-11'),
     }

     service.update(1, updateData);
     const upDateMemo = service.getOne(1);
     
     expect(upDateMemo.title).toEqual('update Memo');
     expect(upDateMemo.description).toEqual('Test 샬라샬라');
   })

   it('404를 뱉는 지 확인합니다.', () => {
     try{
       service.update(999, {});
     }catch(e){
       expect(e).toBeInstanceOf(NotFoundException);
     }
   })
 })
});
