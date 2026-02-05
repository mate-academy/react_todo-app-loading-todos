import React from 'react';

type Props = {
  type: 'button' | 'submit' | 'reset' | undefined;
  className: string;
  dataCy: string;
  content?: string;
};

export const Button: React.FC<Props> = ({
  type,
  className,
  dataCy,
  content = '',
}) => {
  return (
    <button type={type} className={className} data-cy={dataCy}>
      {content}
    </button>
  );
};
