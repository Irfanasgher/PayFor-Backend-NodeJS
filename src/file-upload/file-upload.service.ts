import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
import {azureConfig} from '../constant'

@Injectable()
export class FileUploadService {
  constructor(){}


  async upload(files):Promise<any> {
            
      try {
      
            const sharedKeyCredential = new StorageSharedKeyCredential(azureConfig.ACCOUNT_NAME, azureConfig.KEY);
            const blobServiceClient = new BlobServiceClient(
                `https://${azureConfig.ACCOUNT_NAME}.blob.core.windows.net`,
                sharedKeyCredential
            );

              // const containerName = `payfor`;
              // const containerClient = blobServiceClient.getContainerClient(containerName);
              // const createContainerResponse = await containerClient.create();
              // console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);
              const containerName = "payfor";
              const containerClient = blobServiceClient.getContainerClient(containerName);
              
              var blobfilesArr=[]

              blobfilesArr=files.map((file)=>{
                
                const fileContent = file;
                // console.log(fileContent)
                // const blobName = `${prefix}-image-`+ new Date().getTime();
                const blobName = fileContent.originalname;
                const blockBlobClient =  containerClient.getBlockBlobClient(blobName);
                blockBlobClient.upload(fileContent.buffer, fileContent.size)
                .then((res)=>console.log("successfully uploaded"))
                .catch((err)=>{throw new HttpException("an error encountred while uploading file",HttpStatus.FORBIDDEN)});
                
                return {blobName,blobUrl:blockBlobClient.url};

              })


            
            return await blobfilesArr;
          
    }
    catch (err) {
        console.log(err);
        return new HttpException("An Error Encountred",err);
    }

  }





}
