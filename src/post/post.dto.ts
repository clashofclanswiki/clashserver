import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator'

export class PostDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  content: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  pictures?: string[]

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
