import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constant';
import {JwtStrategy} from './jwt_strategy/jwt.strategy'
import { JwtGeneratorService } from './jwt.service';

@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '604800s' },
    }),
  ],
  providers: [JwtGeneratorService,JwtStrategy],
  exports:[JwtGeneratorService]
})
export class JwtGeneratorModule {}
