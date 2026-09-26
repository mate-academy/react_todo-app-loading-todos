/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Fragment, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorTodoMessage, setErrorTodoMessage] = useState<boolean>(false);
  const [filterTodos, setFilterTodos] = useState<Filter>('all');

  useEffect(() => {
    setErrorTodoMessage(false);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorTodoMessage(true));
  }, []);

  useEffect(() => {
    if (errorTodoMessage) {
      const timerId = setTimeout(() => {
        setErrorTodoMessage(false);
      }, 3000);

      return () => clearTimeout(timerId);
    } else {
      return undefined;
    }
  }, [errorTodoMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const countCompletedTodos = todos.filter(todo => !todo.completed);

  const visibleTodos = todos.filter(todo => {
    if (filterTodos === 'active') {
      return !todo.completed;
    }

    if (filterTodos === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const handleDeleteNotification = () => {
    setErrorTodoMessage(false);
  };

  const handleFilterTodos = (filter: Filter) => {
    setFilterTodos(filter);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <Fragment>
            <TodoList todos={visibleTodos} />
            <Footer
              onFilterChange={handleFilterTodos}
              filterTodos={filterTodos}
              countCompletedTodos={countCompletedTodos}
            />
          </Fragment>
        )}
      </div>
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${errorTodoMessage ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleDeleteNotification}
        />
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
