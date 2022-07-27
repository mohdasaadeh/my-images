import { IsString } from 'class-validator';

export class EditImageDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
