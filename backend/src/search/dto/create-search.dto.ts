import { IsString, MinLength } from 'class-validator';

export class CreateSearchDto {
  @IsString()
  @MinLength(1)
  query: string;
}
