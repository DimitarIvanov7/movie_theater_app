import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface PropTypes {
  id: string;
  image: string;
  title: string;
  text: string;
  imgWidth: number;
  imgHeight: number;
  href: string;
  alt?: string;
}

const LinkCard = ({
  id,
  image,
  title,
  text,
  imgWidth,
  imgHeight,
  alt = '',
  href,
}: PropTypes) => {
  return (
    <Link href={href}>
      <div className="cursor-pointer flex flex-col border border-white p-4 justify-center rounded-lg hover:scale-105 duration-200 ">
        <h2 className="text-center py-2 text-2xl">{title}</h2>
        <div>
          <Image
            className="h-64 object-cover "
            src={image}
            width={imgWidth}
            height={imgHeight}
            alt={alt}
          />
        </div>

        <p className="text-center py-2">{text}</p>
      </div>
    </Link>
  );
};

export default LinkCard;
