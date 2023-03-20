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
import { Booking } from './bookings/booking.entity';
import { User } from './auth/user.entity';
import { Movie } from './movies/movie.entity';
import { Projection } from './projections/projection.entity';
import { Row } from './rows/row.entity';
import { Comment } from './comments/comment.entity';
import { Hall } from './halls/hall.entity';
import { Rating } from './ratings/rating.entity';
import { Place } from './places/place.entity';
import { Genre } from './movies/genre.entity';

@Module({
  imports: [
    BookingModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'theater_management',
      autoLoadEntities: true,
      synchronize: true,
      entities: [
        Booking,
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
    AuthModule,
    PlacesModule,
    HallsModule,
    RowsModule,
    MoviesModule,
    ProjectionsModule,
    RatingsModule,
    CommentsModule,
  ],
})
export class AppModule {}
