import { BadRequestException, PipeTransform } from '@nestjs/common';

export class AvailabilityValidationPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'boolean') {
      throw new BadRequestException(`${value} is invalid`);
    }
    return value;
  }
}
