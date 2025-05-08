import { IsArray } from "class-validator";
import { PageMetaDto } from "./page-dto";
import { ApiProperty } from "@nestjs/swagger";

export class PageDto<T>{
    @IsArray()
    @ApiProperty({ isArray: true })
    readonly data: T[];

    @ApiProperty({type: () => PageMetaDto})
    readonly meta: PageMetaDto;
}