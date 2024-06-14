import React, { ReactNode } from 'react';
type Props = {
  type: 'submit' | 'reset' | 'button';
  className: string;
  dataCy: string;
  onClick: () => void;
  children?: ReactNode;
};

export const Button: React.FC<Props> = ({
  type,
  className,
  dataCy,
  onClick,
  children,
}) => {
  return (
    <button
      className={className}
      type={type}
      data-cy={dataCy}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
