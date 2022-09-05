
import { Sequelize } from 'sequelize-typescript';
import { RdbConfig } from 'src/constant';
const os = require("os");

const isLocal = os.hostname().indexOf("local")
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(

        // {
        //   dialect: 'mysql',
        //   host: 'localhost',
        //   port: 3306,
        //   username: 'root',
        //   password: '',
        //   database: 'payforu',
        // }
        
        {
          dialect: 'mysql',
          host: 'mysql-devdbsrv.mysql.database.azure.com',
          port: 3306,
          username: 'evdbadmin@mysql-devdbsrv.mysql.database.azure.com',
          password: '0s3Aq&0DN3zD5QPC',
          database: 'payfor',
        }

    );      
      sequelize.addModels([ __dirname + '/../**/*.entity{.ts,.js}' ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];