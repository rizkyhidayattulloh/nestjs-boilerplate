import { Injectable } from '@nestjs/common';
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import { DataSource } from 'typeorm';

@Injectable()
@ValidatorConstraint({ name: 'unique', async: true })
export class UniqueValidator implements ValidatorConstraintInterface {
    constructor(private dataSource: DataSource) {}

    async validate(
        value: any,
        validationArguments?: ValidationArguments
    ): Promise<boolean> {
        const [entityClass, uniqueField = validationArguments.property] =
            validationArguments.constraints;

        return (
            (await this.dataSource.getRepository(entityClass).count({
                where: {
                    [uniqueField]: value
                }
            })) <= 0
        );
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `${validationArguments.property} alredy used`;
    }
}
