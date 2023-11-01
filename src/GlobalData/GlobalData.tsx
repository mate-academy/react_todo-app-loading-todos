import React from 'react';

type ContextOptins = {
  userId: number;
};

export const Context = React.createContext<ContextOptins>({ userId: 7023 });
