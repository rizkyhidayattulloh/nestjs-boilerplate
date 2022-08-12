import { Type } from 'class-transformer';
import {
    Allow,
    IsArray,
    IsInt,
    IsNotEmpty,
    IsOptional,
    Max,
    Min
} from 'class-validator';
import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
    @IsArray()
    data: T[];

    meta: PageMetaDto;

    constructor(data: T[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}

export class PageOptionsDto {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    page?: number = 1;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    take?: number = 10;

    @Allow()
    skip?: number = (this.page - 1) * this.take;

    @IsNotEmpty()
    test: string;
}
