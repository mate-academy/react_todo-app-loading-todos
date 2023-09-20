import React, {
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api/todos';
import { UserWarning } from '../../UserWarning';

interface Context {
  todos: Todo[],
  visibleTodos: Todo[],
  errorMessage: boolean,
  setErrorMessage: (value: boolean) => void,
  setFilterType: (value: SortType) => void,
}

export const TodosContext = React.createContext<Context>({
  todos: [],
  visibleTodos: [],
  errorMessage: false,
  setErrorMessage: () => { },
  setFilterType: () => { },
});

interface Props {
  children: ReactNode;
}

const USER_ID = 11537;

export enum SortType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [filterType, setFilterType] = useState(SortType.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((e: string) => {
        setErrorMessage(true);
        setTimeout(() => {
          setErrorMessage(false);
        }, 3000);
        // eslint-disable-next-line no-console
        console.log(e);
      });
  }, []);

  const visibleTodos = useMemo(() => {
    switch (filterType) {
      case SortType.Active:
        return todos.filter(todo => todo.completed === false);

      case SortType.Completed:
        return todos.filter(todo => todo.completed === true);

      default:
        return todos;
    }
  }, [filterType, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        visibleTodos,
        errorMessage,
        setErrorMessage,
        setFilterType,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
