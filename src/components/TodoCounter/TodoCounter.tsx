import React from 'react';

type Props = {
  active: number;
};

export const TodoCounter: React.FC<Props> = ({ active }) => {
  return (
    <>
      <span>
        {`${active} ${active <= 1 ? 'item' : 'items'} left`}
      </span>
    </>
  );
};
