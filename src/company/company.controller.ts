import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, Res } from '@nestjs/common';
import { FilesInterceptor,FileInterceptor } from '@nestjs/platform-express';
import { ApiTags,ApiConsumes,ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { StoreService } from 'src/store/store.service';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags("company")
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly fileuploadService : FileUploadService,
    private readonly storeService : StoreService
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  async create(@UploadedFiles() files, @Body() createCompanyDto: CreateCompanyDto,@Res({passthrough:true}) res:Response) {

    await this.companyService.findCompanyByEmail(createCompanyDto,res) 

    if(files.length<2){
      return res.status(400).json({message:'logo and bank statement is mandatory'});
    }
    else{
      const filesArr = await this.fileuploadService.upload(files);
      return this.companyService.create(createCompanyDto,filesArr[0].blobUrl,filesArr[1].blobUrl,res)
    }

  }

  @Get()
  findAll(@Res() res:Response) {
    return this.companyService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string,@Res() res:Response) {
    return this.companyService.findOne(+id,res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }

  @Get("getAllCustomers/:company_id")
  getAllCustomers(@Param('company_id') company_id:number){
    return this.storeService.getAllCustomers(company_id)
  }


  @Get("/dashboard/getAllClientsNumber")
  getAllClientNumber(@Res() res:Response){
    this.companyService.getAllClientNumber(res);
  }

}
