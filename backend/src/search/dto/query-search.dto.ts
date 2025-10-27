import { IsString, MinLength } from 'class-validator';

export class QuerySearchDto {
  @IsString()
  @MinLength(1)
  q: string;
}
