import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity() 
export class Memo{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) //hack : 이 코드의 의미를 전혀 모르겠음
    createDate: Date;
}