/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
// import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import classNames from 'classnames';
import { filter, Status } from './utils/helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<Status>(Status.all);
  const [isLoadError, setIsLoadError] = useState(false);
  // const [isTitleError, setIsTitleError] = useState(false);
  // const [isAddingError, setIsAddingError] = useState(false);
  // const [isDeletingError, setIsDeletingError] = useState(false);
  // const [isUpdatingError, setIsUpdatingError] = useState(false);

  useEffect(() => {
    setIsLoadError(false);

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
    };

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

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
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
        {/* show only one message at a time */}
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
