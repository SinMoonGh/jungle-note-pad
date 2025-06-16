import { IsDate, IsDateString, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateMemoDto{
    @IsString()
    readonly title: string

    @IsString()
    readonly description: string

    @IsDateString()
    readonly createDate: Date
}