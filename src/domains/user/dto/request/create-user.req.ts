import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserBody {
    @IsEmail({}, { message: '유효한 이메일 주소를 입력하세요.' })
    @IsNotEmpty({ message: '이메일을 입력하세요.' })
    @ApiProperty({ description: '이메일' })
    email: string;

    @IsString()
    @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
    @MaxLength(20, { message: '비밀번호는 최대 20자까지 입력할 수 있습니다.' })
    @Matches(/[A-Z]/, {
        message: '비밀번호는 최소 1개의 대문자를 포함해야 합니다.'
    })
    @Matches(/[\W_]/, {
        message: '비밀번호는 최소 1개의 특수문자를 포함해야 합니다.'
    })
    @ApiProperty({ description: '비밀번호' })
    password: string;

    @IsString()
    @IsNotEmpty({ message: '사용자 이름을 입력하세요.' })
    @MinLength(2, { message: '사용자 이름은 최소 2자 이상이어야 합니다.' })
    @Matches(/^[^`~!@#$%^&*()_+=[\]{}\\|;:'",.<>/?\s]*$/, {
        message: '사용자 이름에는 특수문자나 공백이 포함될 수 없습니다.'
    })
    @ApiProperty({ description: '사용자 이름' })
    username: string;

    @IsString()
    @IsNotEmpty({ message: '닉네임을 입력하세요.' })
    @MinLength(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' })
    @MaxLength(8, { message: '닉네임은 최대 8자까지 입력할 수 있습니다.' })
    @Matches(/^[^`~!@#$%^&*()_+=[\]{}\\|;:'",.<>/?\s]*$/, {
        message: '닉네임에는 특수문자나 공백이 포함될 수 없습니다.'
    })
    @ApiProperty({ description: '닉네임' })
    nickname: string;

    @IsString()
    @IsNotEmpty({ message: '전화번호를 입력하세요.' })
    @Matches(/^010\d{8}$/, {
        message: '전화번호는 01000000000 형식이어야 합니다.'
    })
    @ApiProperty({ description: '전화번호' })
    phoneNumber: string;
}
