/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { Errors } from './types/Errors';
import { FilterBy } from './types/FiilterBy';

type FilterTheTodos = (todos: Todo[], filterBy: FilterBy) => Todo[];

const getFilteredTodos: FilterTheTodos = (todos, filterBy) => {
  let filteredTodos = todos;

  if (filterBy !== FilterBy.All) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (filterBy) {
        case FilterBy.Active:
          return todo.completed === false;
        case FilterBy.Completed:
          return todo.completed === true;
        default:
          throw new Error('Unknown filter type');
      }
    });
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => {
        setErrorMessage(Errors.Load);
        throw error;
      });
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => setErrorMessage(null), 3000);
    }
  }, [errorMessage]);

  const handleClearingError = () => setErrorMessage(null);
  const handleChangingFilterBy = (value: FilterBy) => setFilterBy(value);
  const handleClearingCompletedTodos = () =>
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));

  const visibleTodos = getFilteredTodos(todos, filterBy);

  const activeTodosCount: number = todos.filter(todo => !todo.completed).length;

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
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              onFilterClick={handleChangingFilterBy}
              activeTodosCount={activeTodosCount}
              onClearCompleted={handleClearingCompletedTodos}
              selectedFilterBy={filterBy}
            />
          </>
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
          onClick={handleClearingError}
        />
        {errorMessage}
      </div>
    </div>
  );
};
