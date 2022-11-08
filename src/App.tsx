import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Notifications } from './types/Notifications';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const newTodoField = useRef<HTMLInputElement>(null);
  const [notification, setNotification] = useState<Notifications | ''>('');
  const [filterType, setFilterType] = useState<Filter>(Filter.All);

  const focusField = () => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  };

  useEffect(() => {
    async function fetchTodos() {
      if (user) {
        const loadedTodos = await getTodos(user.id);

        setTodos(loadedTodos);
      }
    }

    focusField();
    fetchTodos();
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

  const filteredTodos = filterTodos(filterType);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
            aria-label="toggle-all-todos"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={event => setNewTodoTitle(event.target.value)}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
                <div
                  data-cy="Todo"
                  className={classNames(
                    'todo',
                    { completed: todo.completed },
                  )}
                  key={todo.id}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      defaultChecked
                    />
                  </label>
                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                  >
                    {todo.title}
                  </span>
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDeleteButton"
                  >
                    ×
                  </button>

                  <div data-cy="TodoLoader" className="modal overlay">
                    <div
                      className="modal-background has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
              ))}
            </section>
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${todos.length} items left`}
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  data-cy="FilterLinkAll"
                  href="#/"
                  className={classNames(
                    'filter__link',
                    { selected: filterType === Filter.All },
                  )}
                  onClick={() => setFilterType(Filter.All)}
                >
                  All
                </a>

                <a
                  data-cy="FilterLinkActive"
                  href="#/active"
                  className={classNames(
                    'filter__link',
                    { selected: filterType === Filter.Active },
                  )}
                  onClick={() => setFilterType(Filter.Active)}
                >
                  Active
                </a>
                <a
                  data-cy="FilterLinkCompleted"
                  href="#/completed"
                  className={classNames(
                    'filter__link',
                    { selected: filterType === Filter.Completed },
                  )}
                  onClick={() => setFilterType(Filter.Completed)}
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
      {notification && (
        <div
          data-cy="ErrorNotification"
          className={classNames(
            'notification is-danger is-light has-text-weight-normal',
            { hidden: !notification },
          )}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            aria-label="hide-notification"
            onClick={() => setNotification('')}
          />

          {notification}
        </div>
      )}
    </div>
  );
};
