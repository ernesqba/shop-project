import { IsEmpty, IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  CategoryId: number;

  @IsEmpty()
  UserId: number;
}
