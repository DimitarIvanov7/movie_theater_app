import React from "react";

interface Props {
  label: string;
  value: string;
  type?: string;
  required?: boolean;
  onChange: (e: string) => void;
}

const Input = ({
  label,
  value,
  onChange,
  type = "text",
  required = true,
}: Props) => {
  return (
    <div className="flex gap-2">
      <label htmlFor={label}>{label}:</label>
      <input
        className="text-black"
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
