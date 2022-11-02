/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { ErrorType } from './ErrorType';
import { FilterBy } from './types/FilterBy';
import { getVisibletodos } from './utils/getVisibleTodos';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);
  const [errors, setErrors] = useState<ErrorType>(ErrorType.NONE);

  const loadTodos = async () => {
    if (user) {
      try {
        const TodosFromApi = await getTodos(user?.id);

        setTodos(TodosFromApi);
      } catch {
        throw new Error('Todos not found');
      }
    }
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    loadTodos();

    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setErrors(ErrorType.NONE), 3000);
  }, [errors]);

  useEffect(() => {
    setErrors(ErrorType.NONE);
  }, [filterBy]);

  const handleError = (errorType: ErrorType) => {
    setErrors(errorType);
  };

  const handleAddError = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setErrors(ErrorType.ADD);
    }
  };

  const handleSetFilterBy = (filter: FilterBy) => {
    setFilterBy(filter);
  };

  const closeErrorMassege = () => {
    setErrors(ErrorType.NONE);
  };

  const hasTodos = todos.length > 0;

  const visibleTodos = getVisibletodos(todos, filterBy);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {hasTodos && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className="todoapp__toggle-all active"
              onClick={() => handleError(ErrorType.UPDATE)}
            />
          )}

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onKeyDown={(event) => handleAddError(event)}
              onFocus={() => setErrors(ErrorType.NONE)}
            />
          </form>
        </header>

        {hasTodos && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {visibleTodos.map(({ title, completed }) => (
                <div
                  data-cy="Todo"
                  className={cn(
                    'todo',
                    { completed },
                  )}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      defaultChecked
                      onClick={() => handleError(ErrorType.UPDATE)}
                    />
                  </label>

                  <span data-cy="TodoTitle" className="todo__title">
                    {title}
                  </span>

                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDeleteButton"
                    onClick={() => handleError(ErrorType.DELETE)}
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
                  className={cn(
                    'filter__link',
                    { selected: filterBy === FilterBy.ALL },
                  )}
                  onClick={() => handleSetFilterBy(FilterBy.ALL)}
                >
                  All
                </a>

                <a
                  data-cy="FilterLinkActive"
                  href="#/active"
                  className={cn(
                    'filter__link',
                    { selected: filterBy === FilterBy.ACTIVE },
                  )}
                  onClick={() => handleSetFilterBy(FilterBy.ACTIVE)}
                >
                  Active
                </a>
                <a
                  data-cy="FilterLinkCompleted"
                  href="#/completed"
                  className={cn(
                    'filter__link',
                    { selected: filterBy === FilterBy.COMPLETED },
                  )}
                  onClick={() => handleSetFilterBy(FilterBy.COMPLETED)}
                >
                  Completed
                </a>
              </nav>

              <button
                data-cy="ClearCompletedButton"
                type="button"
                className="todoapp__clear-completed"
                onClick={() => handleError(ErrorType.DELETE)}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: errors === ErrorType.NONE },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={closeErrorMassege}
        />
        {errors === ErrorType.ADD && (
          'Unable to add a todo'
        )}

        {errors === ErrorType.DELETE && (
          'Unable to delete a todo'
        )}

        {errors === ErrorType.UPDATE && (
          'Unable to update a todo'
        )}
      </div>
    </div>
  );
};

// eslint-disable-next-line no-lone-blocks
{ /* <div data-cy="Todo" className="todo">
  <label className="todo__status-label">
    <input
      data-cy="TodoStatus"
      type="checkbox"
      className="todo__status"
    />
  </label>

  <span data-cy="TodoTitle" className="todo__title">CSS</span>

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

<div data-cy="Todo" className="todo">
  <label className="todo__status-label">
    <input
      data-cy="TodoStatus"
      type="checkbox"
      className="todo__status"
    />
  </label>

  <form>
    <input
      data-cy="TodoTitleField"
      type="text"
      className="todo__title-field"
      placeholder="Empty todo will be deleted"
      defaultValue="JS"
    />
  </form>

  <div data-cy="TodoLoader" className="modal overlay">
    <div className="modal-background has-background-white-ter" />
    <div className="loader" />
  </div>
</div>

<div data-cy="Todo" className="todo">
  <label className="todo__status-label">
    <input
      data-cy="TodoStatus"
      type="checkbox"
      className="todo__status"
    />
  </label>

  <span data-cy="TodoTitle" className="todo__title">React</span>
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

<div data-cy="Todo" className="todo">
  <label className="todo__status-label">
    <input
      data-cy="TodoStatus"
      type="checkbox"
      className="todo__status"
    />
  </label>

  <span data-cy="TodoTitle" className="todo__title">Redux</span>
  <button
    type="button"
    className="todo__remove"
    data-cy="TodoDeleteButton"
  >
    ×
  </button>

  <div data-cy="TodoLoader" className="modal overlay is-active">
    <div className="modal-background has-background-white-ter" />
    <div className="loader" />
  </div>
</div> */ }
