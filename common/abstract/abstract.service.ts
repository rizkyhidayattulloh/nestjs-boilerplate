import { PageMetaDto } from 'common/dtos/pagination/page-meta.dto';
import { PageDto, PageOptionsDto } from 'common/dtos/pagination/page.dto';
import { Repository, SelectQueryBuilder } from 'typeorm';

export class AbstractService<Entity> {
    private _query: SelectQueryBuilder<Entity>;

    constructor(
        private repository: Repository<Entity>,
        private alias?: string
    ) {
        this._query = this.repository.createQueryBuilder(this.alias);
    }

    protected getQuery(): SelectQueryBuilder<Entity> {
        return this._query;
    }

    protected setQuery(query: SelectQueryBuilder<Entity>): this {
        this._query = query;

        return this;
    }

    protected async paginate(
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<Entity>> {
        const query = this._query
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take);

        const itemCount = await query.getCount();
        const entities = await query.getMany();
        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

        return new PageDto<Entity>(entities, pageMetaDto);
    }

    protected async get(): Promise<Entity[]> {
        return this._query.getMany();
    }

    protected async find(): Promise<Entity | null> {
        return this._query.getOne();
    }

    async findByColumns(
        ...data: findByColumnsOptions<Entity>[]
    ): Promise<Entity> {
        const query = this._query;

        data.map((entity, index) => {
            const { column, value } = entity;

            const whereClause = `${this.alias}.${<String>column} = :${<String>(
                column
            )}`;
            const param = { [column]: value };

            if (index === 0) query.where(whereClause, param);
            else query.andWhere(whereClause, param);
        });

        return query.getOne();
    }
}

interface findByColumnsOptions<Entity> {
    column: Partial<keyof Entity>;
    value: string | number;
}
