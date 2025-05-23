import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;
  
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number = 10;
  
    @IsOptional()
    @IsString()
    sortBy?: string;
  
    @IsOptional()
    @IsString()
    sortOrder?: 'ASC' | 'DESC' = 'ASC';
  
    @IsOptional()
    @IsString()
    search?: string;
  }