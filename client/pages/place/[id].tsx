import { GetServerSideProps } from 'next';
import { makeRequest } from '../api/utils';
import { Place } from '@/interfaces/place.interface';

interface PropTypes {
  place: Place;
}

export default function Home({ place }: PropTypes) {
  console.log(place);

  return <div></div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const placeData = await makeRequest(`places/${id}`);

  return { props: { place: placeData.data } };
};
