import { Module } from '@nestjs/common';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { databaseProviders } from './database.provider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}