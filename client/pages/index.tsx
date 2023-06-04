import Image from "next/image";
import { Inter } from "next/font/google";
import { GetServerSideProps } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  return (
    <main
      className={`${inter.className} flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {props.test}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const res = await fetch('https://api.github.com/repos/vercel/next.js');
  // const repo = await res.json();
  return { props: { test: "test" } };
};
