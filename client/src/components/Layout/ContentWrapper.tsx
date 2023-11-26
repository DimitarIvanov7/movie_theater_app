import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  isBig?: boolean;
  defaultPadding?: boolean;
};

export const ContentWrapper = ({
  children,
  className,
  isBig = false,
  defaultPadding = true,
}: Props) => {
  return (
    <div
      className={`mx-auto w-full ${
        isBig ? 'max-w-[1920px]' : 'max-w-screen-2xl'
      } ${className ? className : ''} ${defaultPadding ? 'px-4' : ''}`}
    >
      {children}
    </div>
  );
};
