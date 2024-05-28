import {
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FileService } from './file.service'

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @HttpCode(200)
  @Post()
  @Auth('admin')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string
  ) {
    return this.fileService.saveFiles([file], folder)
  }

  @HttpCode(200)
  @Get()
  async getAllFiles(@Query('folder') folder?: string) {
    return this.fileService.getAllFiles(folder)
  }
}
