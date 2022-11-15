import React, {
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import classNames from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { Notification } from './components/Notification';

import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterKind, setFilterKind] = useState<Filter>(Filter.All);
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id).then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoading(false);
      })
        .catch(() => {
          setIsLoading(false);
          setNotification('Cannot load todos from server');
        });
    }
  }, []);

  const filterTodos = (option: Filter) => {
    switch (option) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);

      case Filter.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const visibleTodos = filterTodos(filterKind);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            aria-label="toggle-all-todos"
            className="todoapp__toggle-all active"
            onClick={() => {
              setNotification('Unable to update a todo');
            }}
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={() => {
                setNotification('Unable to add a todo');
              }}
            />
          </form>
        </header>

        {isLoading && <Loader />}
        {todos.length > 0
          && (
            <TodoList
              todos={visibleTodos}
              onSetNotification={setNotification}
            />
          )}
        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${todos.filter(todo => !todo.completed).length} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                data-cy="FilterLinkAll"
                href="#/"
                className={classNames(
                  'filter__link',
                  { selected: filterKind === Filter.All },
                )}
                onClick={() => setFilterKind(Filter.All)}
              >
                All
              </a>

              <a
                data-cy="FilterLinkActive"
                href="#/active"
                className={classNames(
                  'filter__link',
                  { selected: filterKind === Filter.Active },
                )}
                onClick={() => setFilterKind(Filter.Active)}
              >
                Active
              </a>
              <a
                data-cy="FilterLinkCompleted"
                href="#/completed"
                className={classNames(
                  'filter__link',
                  { selected: filterKind === Filter.Completed },
                )}
                onClick={() => setFilterKind(Filter.Completed)}
              >
                Completed
              </a>
            </nav>

            <button
              data-cy="ClearCompletedButton"
              type="button"
              className="todoapp__clear-completed"
              onClick={() => {
                setNotification('Unable to update a todo');
              }}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <Notification
        notification={notification}
        onSetNotification={setNotification}
      />
    </div>
  );
};
