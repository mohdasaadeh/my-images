import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

import { UserModule } from './users/user.module';
import { ImageModule } from './images/image.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { User } from './users/user.entity';
import { Image } from './images/image.entity';
import { ImageLike } from './images/image-likes/image-like.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: process.env.NODE_ENV === 'development' ? 'sqlite' : 'postgres',
          database:
            process.env.NODE_ENV === 'development'
              ? config.get<string>('DB_NAME')
              : config.get<string>('DATABASE_URL'),
          synchronize: true,
          entities: [User, Image, ImageLike],
        };
      },
    }),
    UserModule,
    ImageModule,
    CloudinaryModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private config: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.config.get<string>('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
