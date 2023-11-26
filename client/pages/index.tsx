import { Inter } from 'next/font/google';
import { GetServerSideProps } from 'next';
import { makeRequest } from './api/utils';
import LinkCard from '@/src/components/LinkCard';
import { Place } from '@/interfaces/place.interface';
import { useEffect, useState } from 'react';
import Slider from '@/src/components/Slider';
import { Movie } from '@/interfaces/movies.interface';
import SelectTickets from '@/src/components/SelectTickets';
import { ContentWrapper } from '@/src/components/Layout/ContentWrapper';
const inter = Inter({ subsets: ['latin'] });

interface PropTypes {
  places: Place[];
}

export default function Home({ places }: PropTypes) {
  const [movieImgs, setMovieImgs] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const moviesRequest = await makeRequest<Movie[]>('movies/all');

      if (moviesRequest.ok) {
        const data: Movie[] = moviesRequest.data;
        setMovieImgs(data.map((movie) => movie.image));
      }
    };

    fetchData();
  }, []);

  return (
    <main
      className={`${inter.className} flex min-h-screen flex-col items-center justify-between `}
    >
      {movieImgs && <Slider imgUrls={movieImgs} />}

      <ContentWrapper className="bg-white mb-5">
        <SelectTickets />
      </ContentWrapper>

      {places.map(({ picture, address, city, name, id }) => (
        <div key={id}>
          <LinkCard
            image={picture}
            title={name}
            imgHeight={200}
            imgWidth={500}
            text={`${city}, ${address}`}
            id={id}
            href={`place/${id}`}
          />
        </div>
      ))}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const placesData = await makeRequest('places/all');

  return { props: { places: placesData.data } };
};
