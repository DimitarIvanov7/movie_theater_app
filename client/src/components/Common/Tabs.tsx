import React, { useState } from 'react';

type Props = {
  options: string[];
  onChange: (optionIndex: number) => void;
};
const Tabs = ({ options, onChange }: Props) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex rounded-md shadow-sm">
      {options.map((option, index) => (
        <div
          onClick={() => {
            setSelected(index);
            onChange(index);
          }}
          className={`border p-3 text-center ${
            index === selected ? 'border-orange-400' : 'border-slate-300'
          }`}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
