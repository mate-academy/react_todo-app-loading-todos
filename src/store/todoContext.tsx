/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { Todo } from '../types/Todo';
import { Error, SetError, ErrorMsg } from '../types/Error';
import { getTodos } from '../api/todos';
import { AuthContext } from '../components/Auth/AuthContext';

interface InitialState {
  todos: Todo[];
  newTodo: Todo | null;
  error: Error;
}

const initialState: InitialState = {
  todos: [],
  newTodo: null,
  error: [false, ErrorMsg.NoError],
};

const useTodos = (initial: InitialState) => {
  const [todos, setTodos] = useState<Todo[]>(initial.todos);
  const [newTodo, setNewTodo] = useState<Todo | null>(initial.newTodo);
  const [error, errorSet] = useState<Error>(initial.error);

  const setError: SetError = (err = false, msg = ErrorMsg.NoError) => {
    errorSet([err, msg]);
  };

  const getNewTodo = (todo: Todo) => {
    setNewTodo(todo);
  };

  const user = useContext(AuthContext);

  useEffect(() => {
    setError();

    getTodos(user?.id || 0)
      .then(data => setTodos(prev => [...prev, ...data]))
      .catch(() => setError(true, ErrorMsg.AddError));
  }, []);

  return {
    todos,
    newTodo,
    error,
    setError,
    getNewTodo,
  };
};

const TodoContext = createContext<ReturnType<typeof useTodos> | null>(null);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useTodoContext = () => useContext(TodoContext)!;

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TodoContext.Provider value={useTodos(initialState)}>
      {children}
    </TodoContext.Provider>
  );
};
