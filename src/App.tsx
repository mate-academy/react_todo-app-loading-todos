/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { FilterOptions } from './types/FilterOptions';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Error } from './components/Error';

export const App: React.FC = () => {
  const [todosToUse, setTodosToUse] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeFilter, setActiveFilter] = useState(FilterOptions.ALL);

  useEffect(() => {
    getTodos()
      .then((todos: Todo[]) => {
        setTodosToUse(todos);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  const visibleTodos = todosToUse.filter(todo => {
    if (activeFilter === FilterOptions.ACTIVE) {
      return !todo.completed;
    }

    if (activeFilter === FilterOptions.COMPLETED) {
      return todo.completed;
    }

    return true;
  });

  const handleFilterChange = (newFilter: FilterOptions) => {
    setActiveFilter(newFilter);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todosToUse.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {!errorMessage && visibleTodos.length > 0 && (
                <TodoList visibleTodos={visibleTodos} />
              )}
            </section>

            <Footer
              todosToUse={todosToUse}
              activeFilter={activeFilter}
              handleFilterChange={handleFilterChange}
            />
          </>
        )}
      </div>

      <Error errorMessage={errorMessage} />
    </div>
  );
};
