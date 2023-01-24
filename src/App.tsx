/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';

enum FilterCondition {
  ALL = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
}

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [filterCondition, setFilterCondition] = useState(FilterCondition.ALL);

  if (isError) {
    setTimeout(() => setIsError(false), 3000);
  }

  const getSelected = (allTodos: Todo[]): Todo[] => {
    return allTodos.filter(item => {
      switch (filterCondition) {
        case FilterCondition.ALL:
          return true;

        case FilterCondition.COMPLETED:
          return item.completed === true;

        case FilterCondition.ACTIVE:
          return item.completed === false;

        default: return true;
      }
    });
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user?.id)
        .then(getSelected)
        .then(setTodosList)
        .catch(() => {
          setTodosList([]);
          setIsError(true);
          setErrorText('Unable to upload a todo-list');
        });
    }
  }, [filterCondition]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todosList.length > 0 && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className="todoapp__toggle-all active"
            />
          )}

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={() => setIsError(false)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {todosList.map(todo => (
            <div
              data-cy="Todo"
              className={cn(
                'todo',
                { completed: todo.completed },
              )}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  defaultChecked
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
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
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {(todosList.length > 0 || filterCondition !== FilterCondition.ALL) && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${todosList.length} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                data-cy="FilterLinkAll"
                href="#/"
                className={cn('filter__link',
                  {
                    selected: filterCondition === FilterCondition.ALL,
                  })}
                onClick={() => setFilterCondition(FilterCondition.ALL)}
              >
                All
              </a>

              <a
                data-cy="FilterLinkActive"
                href="#/active"
                className={cn('filter__link',
                  {
                    selected: filterCondition === FilterCondition.ACTIVE,
                  })}
                onClick={() => setFilterCondition(FilterCondition.ACTIVE)}
              >
                Active
              </a>
              <a
                data-cy="FilterLinkCompleted"
                href="#/completed"
                className={cn('filter__link',
                  {
                    selected: filterCondition === FilterCondition.COMPLETED,
                  })}
                onClick={() => setFilterCondition(FilterCondition.COMPLETED)}
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
        )}

      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification', 'is-danger', 'is-light', 'has-text-weight-normal',
          { hidden: !isError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsError(false)}
        />
        {errorText}
        {/* Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo */}
      </div>
    </div>
  );
};
