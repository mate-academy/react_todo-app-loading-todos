import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import * as todosAPI from '../api/todos';
import { ErrorMessages } from '../types/ErrorMessages';
import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

type SetTodos = (prev: Todo[]) => Todo[];
type SetIds = (prev: number[]) => number[];

interface State {
  USER_ID: number,
  mainInput: React.RefObject<HTMLInputElement> | null,
  todos: Todo[],
  completedTodos: Todo[],
  unCompletedTodos: Todo[],
  errorText: ErrorMessages,
  loading: boolean,
  idsToChange: number[],
  setTodos: (v: SetTodos) => void,
  setLoading: (v: boolean) => void,
  setIdsToChange: (v: SetIds) => void,
  showError: (v: ErrorMessages) => void,
  deleteTodo: (id: number) => void,
  updateTodo: (todo: Todo) => void,
}

const initialState: State = {
  USER_ID: 0,
  mainInput: null,
  todos: [],
  completedTodos: [],
  unCompletedTodos: [],
  errorText: ErrorMessages.None,
  loading: false,
  idsToChange: [],
  setTodos: () => { },
  setLoading: () => { },
  setIdsToChange: () => { },
  showError: () => { },
  deleteTodo: () => { },
  updateTodo: () => { },
};

export const TodosContext = React.createContext<State>(initialState);

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const USER_ID = 11657;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorText, setErrorText] = useState<ErrorMessages>(ErrorMessages.None);
  const [loading, setLoading] = useState(false);
  const [idsToChange, setIdsToChange] = useState<number[]>([]);
  const mainInput = useRef<HTMLInputElement>(null);
  const completedTodos = useMemo(() => {
    return todos.filter(todo => todo.completed);
  }, [todos]);

  const unCompletedTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const timerId = useRef(0);

  function showError(message: ErrorMessages) {
    window.clearTimeout(timerId.current);

    setErrorText(message);

    if (!message) {
      return;
    }

    timerId.current = window.setTimeout(() => {
      setErrorText(ErrorMessages.None);
    }, 3000);
  }

  function deleteTodo(id: number) {
    setIdsToChange(prevIds => [...prevIds, id]);
    setLoading(true);
    todosAPI.removeTodo(id)
      .then(() => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
      })
      .catch(() => showError(ErrorMessages.Delete))
      .finally(() => {
        setLoading(false);
        setIdsToChange(prevTodos => prevTodos.filter(prevId => prevId !== id));
        mainInput?.current?.focus();
      });
  }

  function updateTodo(updatedTodo: Todo) {
    setLoading(true);
    setIdsToChange(prevIds => [...prevIds, updatedTodo.id]);
    todosAPI.updateTodo(updatedTodo)
      .then(() => setTodos(prevTodos => {
        const nextTodos = [...prevTodos];
        const index = nextTodos.findIndex(todo => todo.id === updatedTodo.id);

        nextTodos.splice(index, 1, updatedTodo);

        return nextTodos;
      }))
      .catch(() => showError(ErrorMessages.Update))
      .finally(() => {
        setLoading(false);
        setIdsToChange(prevIds => prevIds.filter(id => {
          return id !== updatedTodo.id;
        }));
      });
  }

  useEffect(() => {
    client.get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(() => showError(ErrorMessages.Loading));
  }, []);

  const state: State = {
    USER_ID,
    todos,
    mainInput,
    completedTodos,
    unCompletedTodos,
    errorText,
    loading,
    idsToChange,
    setTodos,
    setLoading,
    setIdsToChange,
    showError,
    deleteTodo,
    updateTodo,
  };

  return (
    <TodosContext.Provider value={state}>
      {children}
    </TodosContext.Provider>
  );
};
