import { FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository } from "typeorm";
import { GenericFilter } from "./dto/pagination-generic-filter.dto";

export class PageService{
    
    protected createOrderQuery(filter: GenericFilter){
        const order: any = {};
        if(filter.orderBy){
            order[filter.orderBy] = filter.sortOrder;
            return order;
        }
    }

    protected paginate<T>(
        repository: Repository<T>,
        filter: GenericFilter,
        where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
        select?: (keyof T)[] | string[],
        relations?: FindOptionsRelations<T>
    ){
        const selectObject = select ? this.createSelectObject<T>(select as (keyof T)[]) : undefined;
        
        return repository.findAndCount({
            order: this.createOrderQuery(filter),
            skip: (filter.page - 1) * (filter.pageSize + 1),
            take: filter.pageSize,
            where: where,
            select: selectObject ,
            relations: relations
        })
    }

    private createSelectObject<T>(keys: (keyof T)[]): FindOptionsSelect<T> {
        const selectObj = {} as FindOptionsSelect<T>;
        keys.forEach(key => {
            (selectObj as any)[key] = true;
        });
        return selectObj;
    }
}