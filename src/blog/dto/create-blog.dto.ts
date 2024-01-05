import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  status: boolean;
}
