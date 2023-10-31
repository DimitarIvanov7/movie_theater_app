import Image from 'next/image';
import { Inter } from 'next/font/google';
import { GetServerSideProps } from 'next';
import { makeRequest } from './api/utils';

const inter = Inter({ subsets: ['latin'] });

export default function Home(props: any) {
  console.log(props);

  return (
    <main
      className={`${inter.className} flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {props.test}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const places = await makeRequest('places/all');
  return { props: { places } };
};
