import React from 'react';

type Props = {
  userId: number;
};

export const Context = React.createContext<Props>({ userId: 11886 });
