import { IsNotEmpty, IsString } from 'class-validator';

export class UserCredentialsDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
