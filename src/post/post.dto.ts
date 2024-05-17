import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class PostDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  slug: string

  @IsOptional()
  @IsNumber()
  countOpened?: number

  @IsNotEmpty()
  @IsString()
  image: string
}
