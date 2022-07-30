import { IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  // image: File;
}
