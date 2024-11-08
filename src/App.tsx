/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { Footer } from './components/Footer';
import { SelectedFilter } from './types/SelectedFilter';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorLoad, setErrorLoad] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>(
    SelectedFilter.all,
  );

  const visibleTodos = todos.filter(todo => {
    switch (selectedFilter) {
      case SelectedFilter.all:
        return true;
      case SelectedFilter.active:
        return !todo.completed;
      case SelectedFilter.completed:
        return todo.completed;
    }
  });

  const itemLeft: number = todos.filter(todo => !todo.completed).length;

  function getAllTodos() {
    getTodos()
      .then(resultTodos => {
        setTodos(resultTodos);
      })
      .catch(() => {
        setErrorLoad(true);
        setInterval(() => {
          setErrorLoad(false);
        }, 3000);
      });
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && <TodoList visibleTodos={visibleTodos} />}

        {todos.length > 0 && (
          <Footer
            itemLeft={itemLeft}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorLoad },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {errorLoad && 'Unable to load todos'}
        {false && (
          <>
            <br />
            Title should not be empty
            <br />
            Unable to add a todo
            <br />
            Unable to delete a todo
            <br />
            Unable to update a todo
          </>
        )}
      </div>
    </div>
  );
};
