import { IsDate, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateMemoDto{
    @IsString()
    readonly title: string

    @IsNumber()
    readonly description: string

    @IsDate()
    readonly createDate: Date
}