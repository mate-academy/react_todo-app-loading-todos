/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { TodosFilter } from './components/TodosFilter/TodosFilter';
import { TodosList } from './components/TodosList/TodosList';

const USER_ID = 11625;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.ALL);
  const [errorMessage, setErrorMessage] = useState('');

  const errorDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        if (errorDiv.current !== null) {
          errorDiv.current.classList.remove('hidden');
          setTimeout(() => {
            if (errorDiv.current !== null) {
              errorDiv.current.classList.add('hidden');
              setErrorMessage('');
            }
          }, 3000);
        }
      });
  }, []);

  const handlerFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === Filter.ALL) {
      return true;
    }

    if (filter === Filter.ACTIVE) {
      return !todo.completed;
    }

    return todo.completed;
  });

  const handlerCloseError = () => {
    if (errorDiv.current !== null) {
      errorDiv.current.classList.add('hidden');
      setErrorMessage('');
    }
  };

  const noCompleteTodos = todos.filter(elem => !elem.completed);
  const isSomeComplete = todos.some(todo => todo.completed === true);
  const allCompleted = todos.every(todo => todo.completed === true);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length !== 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: allCompleted,
              })}
              data-cy="ToggleAllButton"
            />
          )}

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

        {todos.length !== 0 && (
          <TodosList todos={filteredTodos} />
        )}

        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${noCompleteTodos.length} items left`}
            </span>

            <TodosFilter
              currentFilter={filter}
              onFilterChange={handlerFilterChange}
            />

            {/* don't show this button if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!isSomeComplete}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        ref={errorDiv}
        data-cy="ErrorNotification"
        className="hidden notification
          is-danger is-light has-text-weight-normal"
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handlerCloseError}
        />
        {/* show only one message at a time */}
        {errorMessage}
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
