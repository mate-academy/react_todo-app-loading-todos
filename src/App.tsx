/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterParam } from './types/FilterParam';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { ErrorNotification } from './components/ErrorBlock';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<string>(FilterParam.All);
  const [hasError, setHasError] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const receivedTodos = await getTodos(user?.id || 0);

        setTodos(receivedTodos);
      } catch (errorFromServer) {
        setErrorText(`${errorFromServer}`);
        setHasError(true);
      }
    };

    getTodosFromServer();
  }, []);

  const visibleTodos = todos.filter(({ completed }) => {
    switch (filterBy) {
      case 'active':
        return !completed;

      case 'completed':
        return completed;

      default:
        return true;
    }
  });

  const allActiveTodos = todos.filter(({ completed }) => !completed).length;

  const hasCompletedTodos = allActiveTodos === todos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
          hasCompletedTodos={hasCompletedTodos}
        />
        <TodoList todos={visibleTodos} />
        {todos.length > 0 && (
          <Footer
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            allActiveTodos={allActiveTodos}
          />
        )}
      </div>

      {hasError && (
        <ErrorNotification
          errorText={errorText}
          hasError={hasError}
          setHasError={setHasError}
        />
      )}
    </div>
  );
};
