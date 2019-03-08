import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import { StoreModule } from 'src/modules/store/store.module';
import { AppConstants } from './app.constants';

@Module({
  imports: [
    MongooseModule.forRoot(AppConstants.adressMongoDB),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: AppConstants.adressSqlDB,
      database: AppConstants.databaseSql,
      username: AppConstants.usernameSql,
      password: AppConstants.passwordSql,
      synchronize: true,
      options: {
        useUTC: true,
        trustedConnection: true,
        encrypt: true
      },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    BackofficeModule,
    StoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
