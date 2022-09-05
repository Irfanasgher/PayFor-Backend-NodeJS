import { ValidationPipe,  } from '@nestjs/common';
import { NestFactory, } from '@nestjs/core';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(helmet());

  // swagger implementation
  const config = new DocumentBuilder().setTitle('Pay4U').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // class validator
  app.useGlobalPipes( new ValidationPipe() )

  // CROSS ORIGIN
  

  var allowedOrigins = ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:5500', 'http://payfor-back.azurewebsites.net','https://payfor-front.azurewebsites.net','https://payfor-merchant.azurewebsites.net'];
  
  const corsOptionsDelegate = (req, callback) => {
    console.log(req.header('Origin'), 'origin-header');
    if (!req.header('Origin')) return callback(null, true);
    let corsOptions;
    let isDomainAllowed = allowedOrigins.indexOf(req.header('Origin')) !== -1;
    if (isDomainAllowed) {
      // Enable CORS for this request
      corsOptions = {
        origin: true,
        credentials: true,
      }
    } else {
      // Disable CORS for this request
      corsOptions = { origin: false }
    }
    callback(null, corsOptions)
  }



  // cors origin and auth implementation
  app.enableCors(corsOptionsDelegate)

 
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

  
}
bootstrap();
