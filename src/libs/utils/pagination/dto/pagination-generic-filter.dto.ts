import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { SortOrder } from "../sort-order.enum";
import { toNumber } from "../convert-number";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GenericFilter{

    @IsOptional()
    public search: string;

    @ApiPropertyOptional({
        minimum: 1,
        default: 1,
      })
    @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
    @IsNumber({}, { message: ' "page" atrribute should be a number' })
    public page: number;
  
    @ApiPropertyOptional({
        minimum: 1,
        maximum: 50,
        default: 10,
      })
    @Transform(({ value }) => toNumber(value, { default: 10, min: 1 }))
    @IsNumber({}, { message: ' "pageSize" attribute should be a number ' })
    public pageSize: number;
  
    @IsOptional()
    public orderBy?: string;
  
    @ApiPropertyOptional({ enum: SortOrder, default: SortOrder.ASC })
    @IsEnum(SortOrder)
    @IsOptional()
    public sortOrder?: SortOrder = SortOrder.DESC;
}