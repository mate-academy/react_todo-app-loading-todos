/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import { Todolist } from './components/Todolist/Todolist';
import { Footer } from './components/Footer/Footer';
import { Filter } from './types/Filter';

const USER_ID = 11843;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(Filter.all);
  const [error, setError] = useState(false);
  const [activeFilter, setActiveFilter] = useState(Filter.all);
  const clickHandler = (value: Filter) => {
    switch (value) {
      case Filter.active:
        setFilterBy(Filter.active);
        setActiveFilter(Filter.active);
        break;
      case Filter.completed:
        setFilterBy(Filter.completed);
        setActiveFilter(Filter.completed);
        break;
      default:
        setFilterBy(Filter.all);
        setActiveFilter(Filter.all);
        break;
    }
  };

  useEffect(() => {
    getTodos(USER_ID).catch().then(setTodos)
      .catch(() => setError(true));
  }, []);

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  const displayfiltered = () => {
    let filteredtodos = [...todos];

    switch (filterBy) {
      case Filter.active:
        filteredtodos = filteredtodos.filter(todo => !todo.completed);
        break;
      case Filter.completed:
        filteredtodos = filteredtodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    return filteredtodos;
  };

  const displayTodos = [...displayfiltered()];

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <Todolist displayTodos={displayTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0
          && (
            <Footer
              clickHandler={clickHandler}
              activeFilter={activeFilter}
              displayTodos={todos}
            />
          )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn('notification', 'is-danger', 'is-light', 'has-text-weight-normal', { hidden: error === false })}
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
