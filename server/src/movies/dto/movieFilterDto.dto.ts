import { PageFilter } from 'src/interface/reactAdmin';
import { CreateMovieDto } from './create-movie.dto';

export interface movieFilterDto extends PageFilter<CreateMovieDto> {}
