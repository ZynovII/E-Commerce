import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class GetProductsFilterDto {
  @IsOptional()
  @IsBoolean()
  isAvailable: boolean;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
