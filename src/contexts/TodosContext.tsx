import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import { Todo } from '../types/Todo';
import { TodosState } from '../types/TodosState';
import { TodosAction } from '../types/TodosAction';

const todosReducer = (state: Todo[], action: TodosAction): Todo[] => {
  switch (action.type) {
    case ('initialize'):
      return [...state, ...action.payload];
    default:
      return state;
  }
};

const initialState: TodosState = [
  [],
  () => {},
];

const TodosContext = createContext(initialState);

type Props = {
  children: ReactNode,
};

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, todosDispatch] = useReducer(todosReducer, []);

  const state: TodosState = useMemo(() => ([
    todos,
    todosDispatch,
  ]), [todos, todosDispatch]);

  return (
    <TodosContext.Provider value={state}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosState = () => useContext(TodosContext);
