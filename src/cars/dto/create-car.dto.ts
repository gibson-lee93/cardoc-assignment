import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  brandName: string;

  @IsString()
  @IsNotEmpty()
  modelName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/\d{3}[/]\d{2}[R]\d{2}/, {
    message: '{폭}/{편평비}R{휠사이즈} 구조로 타이어 정보를 입력해 주세요',
  })
  tireSize: string;
}
