/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';

enum FilterTypes {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

function prepareGoods(todos: Todo[], filteringType: FilterTypes): Todo[] {
  const allTodos = [...todos];

  switch (filteringType) {
    case FilterTypes.Active:
      return allTodos.filter(todo => !todo.completed);
    case FilterTypes.Completed:
      return allTodos.filter(todo => todo.completed);
    default:
      return allTodos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filteringType, setFilteringType] = useState<FilterTypes>(
    FilterTypes.All,
  );
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const unCompletedTodos = todos.filter(todo => todo.completed === false);
  const allCompletedTodos = todos.length - unCompletedTodos.length;

  function getAllTodos() {
    setLoading(true);
    getTodos()
      .then(receivedTodos => {
        setTodos(receivedTodos);
        setLoading(false);
      })
      .catch(() => {
        setErrorMessage(`Unable to load todos`);
        setLoading(false);
      });
  }

  useEffect(() => {
    if (USER_ID) {
      getAllTodos();
    }
  }, []);

  useEffect(() => {
    setFilteredTodos(prepareGoods(todos, filteringType));
  }, [todos, filteringType]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleAddingTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (!value) {
      setErrorMessage('Title should not be empty');
    }

    e.preventDefault();
    setValue('');
  };

  const handleFiltering = (type: FilterTypes) => {
    setFilteringType(type);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: allCompletedTodos,
            })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              value={value}
              onChange={handleAddingTodo}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(({ id, title, completed }) => (
            <div key={id}>
              <div
                data-cy="Todo"
                className={classNames('todo', {
                  completed,
                })}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={completed}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>
                <div data-cy="TodoLoader" className="modal overlay">
                  <div
                    className={classNames(
                      'modal-background has-background-white-ter',
                      { 'is-active': loading },
                    )}
                  />
                  <div className="loader" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {unCompletedTodos.length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filteringType === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={() => handleFiltering(FilterTypes.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filteringType === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => handleFiltering(FilterTypes.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filteringType === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => handleFiltering(FilterTypes.Completed)}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.length === unCompletedTodos.length}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    </div>
  );
};

// Unable to load todos
// <br />
// Title should not be empty
// <br />
// Unable to add a todo
// <br />
// Unable to delete a todo
// <br />
// Unable to update a todo
