import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'yup';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      await this.schema.validate(value);
    } catch (error) {
      throw new BadRequestException(error);
    }

    return value;
  }
}
