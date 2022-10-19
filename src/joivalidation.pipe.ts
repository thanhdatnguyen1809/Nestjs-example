import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NumberSchema, ObjectSchema } from "joi";

@Injectable()
export class JoiValidationPipe implements PipeTransform<any> {
    // constructor(private schema: ObjectSchema) {
        
    // }

    async transform(value: any, {metatype}: ArgumentMetadata) {
        if(!metatype || !this.toValidate(metatype)) {
            return value;
        }
        
        const object = plainToInstance(metatype, value);

        const errors = await validate(object);
        if(errors.length > 0) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}