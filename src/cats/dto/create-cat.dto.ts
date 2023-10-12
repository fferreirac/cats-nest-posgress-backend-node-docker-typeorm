import { IsString, MinLength, IsInt, IsPositive } from "class-validator";

export class CreateCatDto {

    @IsString()
    @MinLength(3)
    name: string;

    @IsInt()
    @IsPositive()
    age: number;

    @IsString()
    breed?: string;

}
