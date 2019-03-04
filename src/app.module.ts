import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://viniciustes:valen160412@ds040089.mlab.com:40089/petshop'),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
