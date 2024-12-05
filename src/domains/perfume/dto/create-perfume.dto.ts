import { UploadFileDto } from 'src/common/upload-file.dto';

export class CreatePerfumeDto {
  name: string;
  brand: string;
  description: string;
  price: number;
  intensity: string;
  mood: string;
  longevity: string;
  gender: string;
  season: string[];
  scents: string[];
  image: UploadFileDto;
}
