import React, { useEffect, useState } from 'react';
import Input from './Input';

type Props = {
  options: string[];
  headline: string;
  onSelect: (arg0: number) => void;
};
const Select = ({ headline, options, onSelect }: Props) => {
  const [avaliableOptions, setAvaliableOptions] = useState(options);

  const areFiltered = avaliableOptions.length !== options.length;

  useEffect(() => {
    setAvaliableOptions(options);
  }, [options]);

  const search = (val: string) => {
    val
      ? setAvaliableOptions((currOptions) =>
          currOptions.filter((option) => option.includes(val))
        )
      : setAvaliableOptions(options);
  };

  const [opened, setOpened] = useState(false);

  return (
    <div className="w-56 cursor-pointer">
      <div
        onClick={() => setOpened((prevState) => !prevState)}
        className="border rounded-md hover:border-black p-3 flex justify-between border-slate-400 shadow-md"
      >
        <div className="text-xl text-black">{headline}</div>
        <div className="text-black">{'>'}</div>
      </div>

      {opened && (
        <div className="rounded-md border border-slate-300 flex flex-col items-center">
          <Input
            onChange={search}
            className="py-2"
            fieldClassName="shadow-2xl"
          />

          <div className="w-full">
            {avaliableOptions.map((option, index) => {
              return (
                <p
                  onClick={() => {
                    onSelect(index);
                    setOpened(false);
                  }}
                  className={`p-1 text-center ${
                    areFiltered && index === 0
                      ? 'bg-black text-white'
                      : 'text-black hover:bg-slate-300'
                  }`}
                >
                  {option}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
