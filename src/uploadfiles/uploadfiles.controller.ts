import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('uploadfiles')
export class UploadfilesController {
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  uploadfiles(@UploadedFile(new ParseFilePipe({
    validators: [
        
    ]
  })) file: Express.Multer.File) {
    console.log(file.buffer.toString().length);
    return {
        file: file.buffer.toString()
    }
  }
}
