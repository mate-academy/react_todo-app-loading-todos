/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { Errors } from './types/Errors';
import { Filters } from './types/Filters';

const USER_ID = 11338;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Errors | ''>('');
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [filter, setFilter] = useState(Filters.All);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case Filters.Active: {
        return todos.filter(todo => !todo.completed);
      }

      case Filters.Completed: {
        return [...todos].filter(todo => todo.completed);
      }

      default: {
        return todos;
      }
    }
  }, [todos, filter]);

  const errorTimerId = useRef<NodeJS.Timeout | null>(null);

  const showError = (errorText: Errors) => {
    setError(errorText);
    setErrorVisibility(true);

    if (errorTimerId.current) {
      clearTimeout(errorTimerId.current);
    }

    errorTimerId.current = setTimeout(() => {
      setErrorVisibility(false);
    }, 3000);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then((setTodos))
      .catch(() => {
        showError(Errors.Load);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <Main todos={visibleTodos} />

        {!!todos.length && (
          <Footer
            todos={todos}
            filter={filter}
            onFilter={(value) => setFilter(value)}
          />
        )}
      </div>

      <ErrorMessage
        error={error}
        isVisible={errorVisibility}
        onClose={() => setErrorVisibility(false)}
      />
    </div>
  );
};
