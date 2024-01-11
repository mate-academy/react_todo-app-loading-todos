/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Errors } from './types/Errors';
import { FilterOptions } from './types/FilterOptions';

const USER_ID = 12166;
const getFilteredTodos = (todos: Todo[], filterBy: FilterOptions) => {
  switch (filterBy) {
    case FilterOptions.All:
      return todos;
    case FilterOptions.Active:
      return todos.filter(todo => !todo.completed);
    case FilterOptions.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMasage, setErrorMasage] = useState(Errors.allGood);
  const [filterBy, setFilterBy] = useState(FilterOptions.All);
  const filteredTodos = getFilteredTodos(todos, filterBy);
  const numberOfUncompletedTodos = todos.filter(todo => !todo.completed).length;

  const handelErrorHide = () => {
    setErrorMasage(Errors.allGood);
  };

  function loadTodos() {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMasage(Errors.cantGetArray));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadTodos, [USER_ID]);

  useEffect(() => {
    window.setInterval(() => {
      setErrorMasage(Errors.allGood);
    }, 3000);
  }, [errorMasage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

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

        {!!todos.length && (
          <>
            <TodoList todos={filteredTodos} />
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {`${numberOfUncompletedTodos} items left`}
              </span>

              <TodoFilter changeFilter={setFilterBy} />

              {numberOfUncompletedTodos && (
                <button
                  type="button"
                  className="todoapp__clear-completed"
                  data-cy="ClearCompletedButton"
                >
                  Clear completed
                </button>
              )}

            </footer>
          </>
        )}

      </div>

      <div
        data-cy="ErrorNotification"
        className={
          classNames('notification is-danger is-light has-text-weight-normal',
            !errorMasage && 'hidden')
        }
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handelErrorHide}
        />
        {errorMasage}
      </div>

    </div>
  );
};
