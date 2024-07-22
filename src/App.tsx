/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import Header from './Cpmponents/Header';
import TodoList from './Cpmponents/TodoList';
import Footer from './Cpmponents/Footer';
import { Status } from './types/status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(Status.all);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  const Tasks = () => {
    const { active, completed } = Status;

    switch (filterBy) {
      case active:
        return todos.filter(todo => !todo.completed);

      case completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const changeFilter = useCallback((newFilter: Status) => {
    setFilterBy(newFilter);
  }, []);

  const activeTasks = () => {
    return todos.filter(todo => !todo.completed).length;
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList tasks={Tasks()} />

        {!!todos.length && (
          <Footer
            activeTasks={activeTasks}
            filterBy={filterBy}
            changeFilter={changeFilter}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
