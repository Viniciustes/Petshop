import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import { StoreModule } from 'src/modules/store/store.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://viniciustes:valen160412@ds040089.mlab.com:40089/petshop'),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '(localdb)\\MSSQLLocalDB',
      port: 3306,
      database: 'PetshopDB',
      synchronize: true,
      options: {
        useUTC: true,
        trustedConnection: true,
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
