/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer/Footer';
import { Error } from './components/Error';
import { Filter } from './types/Filter';

const USER_ID = 11830;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState(Filter.All);
  const [isLoading, setIsLoading] = useState(true);
  const [isHiddenClass, setIsHiddenClass] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        setIsHiddenClass(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredTodos = useMemo(() => (
    todos.filter(todo => {
      switch (filter) {
        case Filter.Active:
          return !todo.completed;
        case Filter.Completed:
          return todo.completed;
        default:
          return true;
      }
    })
  ), [todos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />

        <TodoList
          todos={filteredTodos}
        />

        {todos.length !== 0 && (
          <Footer
            fullTodos={todos}
            // todos={filteredTodos}
            setFilter={setFilter}
          />
        )}
      </div>
      {!isLoading && (
        <Error
          error={error}
          isHiddenClass={isHiddenClass}
          setIsHiddenClass={setIsHiddenClass}

          // setError={setError}
        />
      )}
    </div>
  );
};
