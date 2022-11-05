/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);
  const [hasError, setHasError] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');

  const getTodosFromServer = async () => {
    if (user) {
      try {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      } catch {
        setHasError(true);

        setTimeout(() => {
          setHasError(false);
        }, 3000);
      }
    }
  };

  const deleteErrors = () => {
    setHasError(false);
  };

  const visibleTodos = todos.filter(todo => {
    switch (filterBy) {
      case FilterBy.Completed:
        return todo.completed === true;
      case FilterBy.Active:
        return todo.completed === false;
      case FilterBy.All:
      default:
        return todo;
    }
  });

  const handleFilter = (filter: FilterBy) => {
    setFilterBy(filter);
  };

  useEffect(() => {
    getTodosFromServer();

    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const itemsLeft = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={(event) => (setTodoTitle(event.target.value))}
            />
          </form>
        </header>
        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${itemsLeft} items left`}
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  data-cy="FilterLinkAll"
                  href="#/"
                  className={classNames('filter__link', {
                    selected: filterBy === FilterBy.All,
                  })}
                  onClick={() => handleFilter(FilterBy.All)}
                >
                  All
                </a>

                <a
                  data-cy="FilterLinkActive"
                  href="#/active"
                  className={classNames('filter__link', {
                    selected: filterBy === FilterBy.Active,
                  })}
                  onClick={() => handleFilter(FilterBy.Active)}
                >
                  Active
                </a>
                <a
                  data-cy="FilterLinkCompleted"
                  href="#/completed"
                  className={classNames('filter__link', {
                    selected: filterBy === FilterBy.Completed,
                  })}
                  onClick={() => handleFilter(FilterBy.Completed)}
                >
                  Completed
                </a>
              </nav>

              <button
                data-cy="ClearCompletedButton"
                type="button"
                className="todoapp__clear-completed"
              >
                Clear completed
              </button>
            </footer>
          </>
        )}

      </div>
      {hasError && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={deleteErrors}
          />

          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo
        </div>
      )}
    </div>
  );
};
