import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
// eslint-disable-next-line max-len
import { Todo } from './types/Todo';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Filter } from './types/Filters';
import { filteredTodosByComplited } from './helpers';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [complitedFiler, setComplitedFilter] = useState(Filter.All);

  const uncomplitedTodosUnmount = useMemo(() => {
    const uncomplitedTodos = todos.filter((todo) => todo.completed);

    return uncomplitedTodos.length;
  }, []);

  const showError = useCallback((message: string) => {
    setErrorMessage(message);

    setTimeout(() => setErrorMessage(''), 3000);
  }, []);

  const closeErrorMessage = useCallback(() => {
    setErrorMessage('');
  }, []);

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => {
          showError('Failed to load todos');
        });
    }
  }, []);

  const visibleTodos = useMemo(() => {
    const filteredTodos = filteredTodosByComplited(todos, complitedFiler);

    return filteredTodos;
  }, [todos, complitedFiler]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {todos.length !== 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              uncomplitedTodosUnmount={uncomplitedTodosUnmount}
              complitedFilter={complitedFiler}
              setComplitedFilter={setComplitedFilter}
            />
          </>
        )}

      </div>
      {errorMessage && (
        <ErrorMessage message={errorMessage} closeButton={closeErrorMessage} />
      )}

    </div>

  );
};
