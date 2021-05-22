import { IsNotEmpty, MinLength, IsEmail, IsEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly fullName: string;
  @IsNotEmpty()
  readonly identificationNumber: string;
  @IsNotEmpty()
  readonly username: string;
  @IsNotEmpty()
  readonly country: string;
  @IsNotEmpty()
  readonly province: string;
  @IsNotEmpty()
  readonly municipality: string;
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly address: string;
  @IsEmpty()
  readonly rol: string;
}
