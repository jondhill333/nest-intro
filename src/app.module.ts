import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule],
  // controllers are repsonsible for listening to incoming requests, intertretating them and...
  // returning the repsonse.
  controllers: [AppController],
  // providers are extra services or prpvoders to do specific things.
  providers: [AppService],
})
export class AppModule {}
