import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const AddParamToBody = createParamDecorator(
    (args: IAddParamsToBodyArgs, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const { name } = args;
        const value = Object.is(NaN, parseInt(args.value()))
            ? args.value()
            : parseInt(args.value());

        request.body[name] = value;

        return request;
    }
);

interface IAddParamsToBodyArgs {
    name: string;
    value(): any;
}
