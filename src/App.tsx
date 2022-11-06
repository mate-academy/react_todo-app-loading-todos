/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  FC, useContext, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodosFilter } from './types/TodosFilter';

export const App: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [filterBy, setFilterBy] = useState<TodosFilter>(TodosFilter.None);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);

  const activeTodos = todos.filter(({ completed }) => completed === false);

  const handleTodosFilter = (filter: TodosFilter) => {
    switch (filter) {
      case TodosFilter.Completed:
        setVisibleTodos(todos.filter(({ completed }) => completed === true));
        break;
      case TodosFilter.Active:
        setVisibleTodos(activeTodos);
        break;

      default:
        setVisibleTodos(todos);
    }
  };

  useEffect(() => {
    try {
      if (user) {
        getTodos(user.id).then(todoFromServer => {
          setTodos(todoFromServer);
          setVisibleTodos(todoFromServer);
        });
      }
    } catch (error) {
      setIsError(true);
    }

    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setIsError(false), 3000);
  }, [isError]);

  const handleFilterChange = (filter: TodosFilter) => {
    handleTodosFilter(filter);
    setFilterBy(filter);
  };

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

        {todos.length && (
          <>
            <TodoList todos={visibleTodos} />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${activeTodos.length} items left`}
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  data-cy="FilterLinkAll"
                  href="#/"
                  className={cn(
                    'filter__link',
                    {
                      selected: filterBy === TodosFilter.None,
                    },
                  )}
                  onClick={() => handleFilterChange(TodosFilter.None)}
                >
                  All
                </a>

                <a
                  data-cy="FilterLinkActive"
                  href="#/active"
                  className={cn(
                    'filter__link',
                    {
                      selected: filterBy === TodosFilter.Active,
                    },
                  )}
                  onClick={() => handleFilterChange(TodosFilter.Active)}
                >
                  Active
                </a>
                <a
                  data-cy="FilterLinkCompleted"
                  href="#/completed"
                  className={cn(
                    'filter__link',
                    {
                      selected: filterBy === TodosFilter.Completed,
                    },
                  )}
                  onClick={() => handleFilterChange(TodosFilter.Completed)}
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

      {isError && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setIsError(false)}
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
