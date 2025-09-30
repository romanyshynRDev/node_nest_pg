import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exceptions/validation.exceptions";



@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        if (!metadata.metatype || typeof metadata.metatype !== "function") {
            return value;
        }
        const obj = plainToClass(metadata.metatype, value);
        const errors = await validate(obj);

        if(errors.length){
            console.log(errors)
            let messages = errors.map(err => {
                return `${err.property} - ${err.constraints ? Object.values(err.constraints).join(', ') : ''}`
            })
            throw new ValidationException(messages)
        }
        return value
    }
}