import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UploadFileDto } from 'src/common/upload-file.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  image: UploadFileDto;
  introduction: string;
}
