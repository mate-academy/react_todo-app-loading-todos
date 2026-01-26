/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';

import React, { useEffect, useState } from 'react';

import { getTodos, USER_ID } from './api/todos';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';

import { Todo } from './types/Todo';
import { Filters } from './types/Filters';

import { handleFilterTodos } from './utils/handleFilterTodos';
import { NewTodo } from './components/NewTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [filterByField, setFilterByField] = useState<Filters>(Filters.All);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, [errorMessage]);

  const quantityActiveTodos = todos.filter(
    todo => todo.completed === false,
  ).length;

  const handleTodoTitle = (query: string) => {
    setTitle(query);
  };

  const resetForm = () => {
    setTitle('');
    setErrorMessage('');
  };

  const handleChangeFilterField = (filterField: Filters) => {
    setFilterByField(filterField);
  };

  const handleClearError = () => {
    setErrorMessage('');
  };

  const handleSubmitTodo = () => {
    if (!title) {
      setErrorMessage('Title should not be empty');

      return;
    }

    resetForm();
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = handleFilterTodos(todos, filterByField);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo
          onSubmit={() => handleSubmitTodo}
          onSetTitle={value => handleTodoTitle(value)}
          titleQuery={title}
          activeTodos={quantityActiveTodos}
        />

        <TodoList todos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Filter
            onChangeFilter={handleChangeFilterField}
            filterField={filterByField}
            activeItemsCount={quantityActiveTodos}
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
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            handleClearError();
          }}
        />
        {/* show only one message at a time */}
        {errorMessage}
        <br />
      </div>
    </div>
  );
};
