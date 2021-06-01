import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  description: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  price: number;

  //FIXME: add validation
  manufacturer: string;
  params: string;
  images: string;
  category: string;
}
