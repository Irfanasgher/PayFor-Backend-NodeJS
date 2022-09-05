import { HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGeneratorService {

  constructor(
    private readonly jwtService: JwtService,
  ){}

  // create jwt Token
  async generate_token(payload) {
    try{
      return this.jwtService.sign(payload)
    }
    catch(err){
      throw new InternalServerErrorException(err.parent.sqlMessage);
    }

  }
  

 

}
