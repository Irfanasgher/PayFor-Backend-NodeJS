import { Controller, Get, Post, UseGuards, Patch, Param, Delete, Req, UseInterceptors, UploadedFile, UploadedFiles, HttpException, HttpStatus } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import {Request} from 'express'
import { ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import {FileUploadDto} from './dto/fileUpload.dto';

@ApiTags("File upload")
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  create(@UploadedFiles() files){
    
    if(files){

      return this.fileUploadService.upload(files);

    }else{
      return new HttpException("An Error Encountred no file detected",HttpStatus.FAILED_DEPENDENCY);
      
    }
  }


}
