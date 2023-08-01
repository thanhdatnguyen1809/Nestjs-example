import { Transform } from "class-transformer";
import { IsBoolean } from "class-validator";

export class QueryPagination {
    @IsBoolean()
    // @Type(() => Boolean)
    @Transform(({ value }) => value === 'true')
    isBoolean: boolean;
}