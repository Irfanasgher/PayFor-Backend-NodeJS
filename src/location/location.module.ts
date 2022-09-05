import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { locationProvider } from './entities/location.provider';

@Module({
  controllers: [LocationController],
  providers: [LocationService,...locationProvider]
})
export class LocationModule {}
