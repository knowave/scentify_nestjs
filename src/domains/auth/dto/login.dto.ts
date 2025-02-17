import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'email은 필수값입니다.' })
  email: string;

  @IsNotEmpty({ message: '비밀번호는 필수값입니다.' })
  password: string;
}
