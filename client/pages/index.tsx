import { Inter } from 'next/font/google';
import { GetServerSideProps } from 'next';
import { makeRequest } from './api/utils';
import LinkCard from '@/src/components/LinkCard';
import { Place } from '@/interfaces/place.interface';
const inter = Inter({ subsets: ['latin'] });

interface PropTypes {
  places: Place[];
}

export default function Home({ places }: PropTypes) {
  return (
    <main
      className={`${inter.className} flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {places.map(({ picture, address, city, name, id }) => (
        <LinkCard
          image={picture}
          title={name}
          imgHeight={200}
          imgWidth={500}
          text={`${city}, ${address}`}
          id={id}
          href={`place/${id}`}
        />
      ))}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const placesData = await makeRequest('places/all');

  return { props: { places: placesData.data } };
};
