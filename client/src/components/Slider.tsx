import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ContentWrapper } from './Layout/ContentWrapper';

type Props = {
  imgUrls: string[];
  autoplay?: boolean;
};

const Slider = ({ imgUrls, autoplay = false }: Props) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const sliderLength = imgUrls?.length;

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      if (slideIndex < sliderLength - 1) {
        setSlideIndex((prevState) => prevState + 1);
      } else {
        setSlideIndex(0);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [sliderLength, slideIndex, autoplay]);

  const handleArrows = (type: string) => {
    if (type === 'left') {
      setSlideIndex((index) => (index === 0 ? sliderLength - 1 : index - 1));
    } else
      setSlideIndex((index) => (index === sliderLength - 1 ? 0 : index + 1));
  };
  return (
    <div className="w-full relative">
      {/* <ArrowBackIcon onClick={() => handleArrows('left')} /> */}

      <div
        className="cursor-pointer absolute left-3 top-1/2"
        onClick={() => handleArrows('left')}
      >
        {'<'}
      </div>
      <img className="h-56 object-cover" src={imgUrls[slideIndex]} alt="" />

      {/* <ArrowBackIcon onClick={() => handleArrows('right')} /> */}

      <div
        className="cursor-pointer absolute right-3 top-1/2"
        onClick={() => handleArrows('right')}
      >
        {'>'}
      </div>

      <div className={`absolute bottom-10 w-full flex justify-center gap-1 `}>
        {imgUrls?.map((_img, index) => {
          return (
            <div
              className={`h-1 w-6 cursor-pointer  ${
                slideIndex === index ? 'bg-primary' : 'bg-base-400'
              }`}
              onClick={() => setSlideIndex(index)}
              key={index}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
