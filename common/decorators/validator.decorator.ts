import { registerDecorator, ValidationOptions } from 'class-validator';
import { UniqueValidator } from 'common/validators/unique.validator';

export function IsUnique(
    entity: object,
    uniqueField: string,
    validationOptions?: ValidationOptions
) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsUnique',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [entity, uniqueField],
            validator: UniqueValidator
        });
    };
}
