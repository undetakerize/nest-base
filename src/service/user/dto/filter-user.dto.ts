import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { GenericFilter } from "src/libs/utils/pagination/dto/pagination-generic-filter.dto";

export class UserFilter extends GenericFilter{
    @ApiPropertyOptional()
    public username: string;
    @ApiPropertyOptional()
    public name: string;
}