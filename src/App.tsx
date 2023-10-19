/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { TodoList } from './components/TodoList/TodoList';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoFilter } from './components/TodoFilter/TodoFilter';

const USER_ID = 11692;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.ALL);
  const [errorMessage, setErrorMessage] = useState('');

  const activeTodos = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  // eslint-disable-next-line no-console
  console.log(todos);

  const filteredTodos: Todo[] = useMemo(() => {
    let preparedTodos = [...todos];

    if (filter !== Filter.ALL) {
      preparedTodos = preparedTodos.filter(todo => {
        switch (filter) {
          case Filter.ACTIVE:
            return !todo.completed;

          case Filter.COMPLETED:
            return todo.completed;

          default:
            return true;
        }
      });
    }

    return preparedTodos;
  }, [filter, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
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

        <TodoList todos={filteredTodos} />

        {/* Hide the footer if there are no todos */}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodos} items left`}
            </span>

            {/* Active filter should have a 'selected' class */}
            <TodoFilter
              filter={filter}
              setFilter={setFilter}
            />

            {/* don't show this button if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
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
        {/* show only one message at a time */}
        {/*
         Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
        */}
        {errorMessage}
      </div>
    </div>
  );
};
