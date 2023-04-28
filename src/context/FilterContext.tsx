import React, { useMemo, useState } from 'react';
import { SortType } from '../types/SortType';

type FilterContextType = {
  filter: SortType,
  setFilter: React.Dispatch<React.SetStateAction<SortType>>,
};

type Props = {
  children: React.ReactNode,
};

export const FilterContext = React.createContext<FilterContextType>({
  filter: SortType.ALL,
  setFilter: () => {},
});

export const FilterContextProvider = ({ children }: Props) => {
  const [filter, setFilter] = useState(SortType.ALL);

  const contextValue = useMemo(() => (
    {
      filter,
      setFilter,
    }
  ), [filter]);

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};
