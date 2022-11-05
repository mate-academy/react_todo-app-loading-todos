import React, { useState } from 'react';
import { SortParam } from '../../types/SortParam';

type NavContextt = {
  sortBy: SortParam,
  setSortBy: React.Dispatch<React.SetStateAction<SortParam>>,
};

export const NavContext = React.createContext<NavContextt>({
  sortBy: SortParam.All,
  setSortBy: () => {},
});

export const NavProvider:
React.FC<React.DetailedHTMLProps<
React.HTMLAttributes<HTMLDivElement>, HTMLDivElement
>> = ({ children }) => {
  const [sortBy, setSortBy] = useState(SortParam.All);

  // console.log(sortBy);

  const contextNav = {
    sortBy,
    setSortBy,
  };

  return (
    <NavContext.Provider value={contextNav}>
      {children}
    </NavContext.Provider>
  );
};
