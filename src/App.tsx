/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { filter, Status } from './utils/helper';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [isLoadError, setIsLoadError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<Status>(Status.all);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error.message);
        setIsLoadError(true);
      });
  }, []);

  useEffect(() => {
    if (!isLoadError) {
      return;
    }

    const timer = setTimeout(() => {
      setIsLoadError(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoadError]);

  const filteredTodos = useMemo(() => {
    return filter(todos, selectedFilter);
  }, [todos, selectedFilter]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <Footer
            todos={todos}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !isLoadError },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        Unable to load todos
        {/* <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
