import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  CategoryId: number;

  @IsEmpty()
  UserId: number;
}
