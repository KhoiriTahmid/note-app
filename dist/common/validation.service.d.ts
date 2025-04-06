import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";
export declare class ValidationService implements PipeTransform {
    private schema;
    constructor(schema: ZodSchema);
    transform(value: unknown, metadata: ArgumentMetadata): any;
}
