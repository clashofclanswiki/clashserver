import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Title must not be empty' })
  @IsString({ message: 'Title must be a string' })
  title: string

  @IsNotEmpty()
  @IsString()
  slug: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  type: string
}
