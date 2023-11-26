export interface Movie {
  id: string;

  name: string;

  length_minutes: number;

  image: string;

  comment: Comment[];

  //   rating: Rating[];

  //   genre: Genre[];
}
