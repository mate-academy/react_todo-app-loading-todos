import { Dispatch, FC, ReactNode, SetStateAction, createContext, useCallback, useContext, useEffect, useState } from "react";
import { Todo } from "../types/Todo";
import { FilterType } from "../types/FilterType";
import { TodosError } from "../types/TodosErrors";

export type TodosContextType = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  filter: FilterType;
  handleFilterChange: (filterStatus: FilterType) => VoidFunction;
  errorMessage: TodosError;
  handleErrorMessage: (error: TodosError) => {};
}
export const TodosContext = createContext({
  todos: [] as Todo[],
  setTodos: (() => { }) as Dispatch<SetStateAction<Todo[]>>,
  filter: 'All' as FilterType,
  handleFilterChange: (filterStatus: FilterType) => () => { },
  errorMessage: TodosError.NONE,
  handleErrorMessage: (error: TodosError) => () => { },
});

type Props = {
  children:ReactNode
}

export const TodoProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('All')
  const [errorMessage, setErrorMessage] = useState<TodosError>(TodosError.NONE)

  const handleFilterChange = (filterStatus: FilterType) => () => {
    setFilter(filterStatus);
  };
  const handleErrorMessage = (error: TodosError) => () => {
    setErrorMessage(error);
  };

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(TodosError.NONE)
      }, 3000)
    }
  }, [errorMessage])
  
  return (
    <TodosContext.Provider value={{
      todos,
      setTodos,
      filter,
      handleFilterChange,
      errorMessage,
      handleErrorMessage,
    }}>
      {children}
    </TodosContext.Provider>
  )
}

export const useTodosContext = (): TodosContextType => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTodosContext must be used within a TodosProvider');
  }
  return context;
};