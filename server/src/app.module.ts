import { Module } from '@nestjs/common';
import { BookingModule } from './bookings/bookings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PlacesModule } from './places/places.module';
import { HallsModule } from './halls/halls.module';
import { RowsModule } from './rows/rows.module';
import { MoviesModule } from './movies/movies.module';
import { ProjectionsModule } from './projections/projections.module';
import { RatingsModule } from './ratings/ratings.module';
import { CommentsModule } from './comments/comments.module';
import { BookedSeat } from './bookings/bookedSeat.entity';
import { User } from './auth/user.entity';
import { Movie } from './movies/movie.entity';
import { Projection } from './projections/projection.entity';
import { Row } from './rows/row.entity';
import { Comment } from './comments/comment.entity';
import { Hall } from './halls/hall.entity';
import { Rating } from './ratings/rating.entity';
import { Place } from './places/place.entity';
import { Genre } from './movies/genre.entity';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { configValidationSchema } from './config.schema';
import { AtGuard } from './common/guards/at.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [
          BookedSeat,
          User,
          Movie,
          Projection,
          Row,
          Comment,
          Hall,
          Rating,
          Place,
          Genre,
        ],
      }),
    }),
    PlacesModule,
    BookingModule,
    AuthModule,
    HallsModule,
    RowsModule,
    MoviesModule,
    ProjectionsModule,
    RatingsModule,
    CommentsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
