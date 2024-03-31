import React, {
  Dispatch,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Todo } from '../types/Todo';

export const TodosContext = createContext({
  list: [] as Todo[],
  setList: (() => {}) as Dispatch<React.SetStateAction<Todo[]>>,
  errorMessage: '',
  setErrorMessage: (() => {}) as Dispatch<React.SetStateAction<string>>,
  tempTodo: {} as Todo | null,
  setTempTodo: (() => {}) as Dispatch<React.SetStateAction<Todo | null>>,
  editingTodo: {} as Todo | null,
  setEditingTodo: (() => {}) as Dispatch<React.SetStateAction<Todo | null>>,
  handleError: (_message: string) => undefined,
  loadingTodosIds: [] as number[],
  setLoadingTodosIds: (() => {}) as Dispatch<React.SetStateAction<number[]>>,
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [list, setList] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [loadingTodosIds, setLoadingTodosIds] = useState<number[]>([]);

  const handleError = useCallback((message: string): undefined => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, []);

  const todosState = useMemo(
    () => ({
      list,
      setList,
      errorMessage,
      setErrorMessage,
      handleError,
      tempTodo,
      setTempTodo,
      editingTodo,
      setEditingTodo,
      loadingTodosIds,
      setLoadingTodosIds,
    }),
    [list, errorMessage, handleError, , tempTodo, editingTodo, loadingTodosIds],
  );

  return (
    <TodosContext.Provider value={todosState}>{children}</TodosContext.Provider>
  );
};
