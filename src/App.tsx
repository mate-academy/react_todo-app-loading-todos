/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Footer } from './components/Footer/Footer';
import {
  ErrorNotification,
} from './components/ErrorNotification/ErrorNotification';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    const getTodosFromServer = async () => {
      const todosFromServer = user && await getTodos(user.id);

      if (todosFromServer) {
        setTodos(todosFromServer);
      }
    };

    getTodosFromServer();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm
          newTodoField={newTodoField}
          query={query}
          onQueryChange={setQuery}
          onErrorChange={setError}
        />

        <TodoList todos={todos} />

        <Footer onTodosChange={setTodos} />
      </div>

      {error && (
        <ErrorNotification query={query} onErrorChange={setError} />
      )}
    </div>
  );
};
