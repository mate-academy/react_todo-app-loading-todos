/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';

import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';

import { ErrorMessages } from './components/ErrorMessages/ErrorMessages';
import { TodoList } from './components/TodoList/TodoList';

import { Status } from './types/Status';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [filterBy, setFilterBy] = useState<Status>(Status.ALL);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getTodosFromApi = async () => {
      try {
        const ID = user ? user.id : 1;
        const response = await getTodos(ID);

        setTodos(response);
        setVisibleTodos(response);
      } catch (e) {
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    };

    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromApi();
  }, []);

  useEffect(() => {
    const newVisibleTodos = todos.filter(todoFilter => {
      switch (filterBy) {
        case Status.ACTIVE:
          return !todoFilter.completed;

        case Status.COMPLETED:
          return todoFilter.completed;

        default:
          return todoFilter;
      }
    });

    setVisibleTodos(newVisibleTodos);
  }, [filterBy, todos]);

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
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="todosCounter">
                {todos.filter(task => !task.completed).length}
                {' items left'}
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  data-cy="FilterLinkAll"
                  href="#/"
                  className={classNames('filter__link', {
                    selected: filterBy === 'all',
                  })}
                  onClick={() => {
                    setFilterBy(Status.ALL);
                  }}
                >
                  All
                </a>

                <a
                  data-cy="FilterLinkActive"
                  href="#/active"
                  className={classNames('filter__link', {
                    selected: filterBy === 'active',
                  })}
                  onClick={() => {
                    setFilterBy(Status.ACTIVE);
                  }}
                >
                  Active
                </a>
                <a
                  data-cy="FilterLinkCompleted"
                  href="#/completed"
                  className={classNames('filter__link', {
                    selected: filterBy === Status.COMPLETED,
                  })}
                  onClick={() => {
                    setFilterBy(Status.COMPLETED);
                  }}
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

      {isError && <ErrorMessages onClose={() => setIsError(false)} />}
    </div>
  );
};
