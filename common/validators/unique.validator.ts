import { Injectable } from '@nestjs/common';
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import { ContextProvider } from 'providers/context.provider';
import { DataSource, FindManyOptions, Not } from 'typeorm';

@Injectable()
@ValidatorConstraint({ name: 'unique', async: true })
export class UniqueValidator implements ValidatorConstraintInterface {
    constructor(private dataSource: DataSource) {}

    async validate(
        value: any,
        validationArguments?: ValidationArguments
    ): Promise<boolean> {
        const [
            entityClass,
            uniqueField = validationArguments.property,
            exceptColumn
        ] = validationArguments.constraints;

        const repository = this.dataSource.getRepository(entityClass);

        let findCondition = {
            [uniqueField]: value
        };

        if (exceptColumn) {
            findCondition[exceptColumn] = Not(
                (validationArguments.object as any)[exceptColumn]
            );
        }

        return (await repository.count({ where: findCondition })) <= 0;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `${validationArguments.property} alredy exists`;
    }
}
