import React from 'react';

interface Props {
  label?: string;
  value?: string;
  type?: string;
  required?: boolean;
  onChange: (e: string) => void;
  className?: string;
  fieldClassName?: string;
}

const Input = ({
  label,
  value,
  onChange,
  type = 'text',
  required = true,
  className,
  fieldClassName,
}: Props) => {
  return (
    <div className={`${label ? 'flex gap-2' : ''} ${className}`}>
      {label && <label htmlFor={label}>{label}:</label>}
      <input
        className={`text-black border border-slate-300 ${fieldClassName}`}
        name={label}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
