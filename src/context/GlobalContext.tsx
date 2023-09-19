import React, { Dispatch, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterTypes';

type Props = {
  children: React.ReactNode;
};

interface GlobalContextType {
  todos: Todo[];
  dispatch: Dispatch<Action>;
}

export const GlobalContext = React.createContext({} as GlobalContextType);

type Action =
  | { type: 'add'; title: string; userId: number }
  | { type: 'setTodos'; todos: Todo[] }
  | { type: 'filterTodos'; filter: FilterType };

const reducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'setTodos':
      return [...state, ...action.todos];

    case 'add':
      return [
        ...state,
        {
          title: action.title,
          id: Date.now(),
          completed: false,
          userId: action.userId,
        },
      ];
    default:
      return state;
  }
};

export const GlobalContextPropvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, []);

  return (
    <GlobalContext.Provider
      value={{
        todos,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
