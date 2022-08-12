import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    UnprocessableEntityException,
    ValidationError
} from '@nestjs/common';
import { Response } from 'express';

@Catch(UnprocessableEntityException)
export class UnprocessableEntityExceptionFilter implements ExceptionFilter {
    catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
        const messages = exception.getResponse()['message'];
        const response = host.switchToHttp().getResponse<Response>();
        const status = exception.getStatus();

        response.status(status).json({
            statusCode: status,
            error: 'Bad Request Exception',
            messages: this.serializeMessage(messages)
        });
    }

    private serializeMessage(response: ValidationError[]) {
        const result = {};

        if (typeof response == 'object') {
            response.forEach((message) => {
                result[message.property] = Object.values(
                    message.constraints
                )[0];
            });
        }

        return result;
    }
}
