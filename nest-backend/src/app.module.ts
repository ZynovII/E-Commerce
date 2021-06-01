import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { CartItemModule } from './cart-item/cart-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      dropSchema: false,
      logging: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    ProductModule,
    ManufacturerModule,
    CartItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
