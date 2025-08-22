/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import classNames from 'classnames';
import { FilterStatus, ErrorType } from './types/enums';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [preparedTodos, setPreparedTodos] = useState<Todo[]>([]);
  const [activeFilterStatus, setActiveFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );
  const [currentError, setCurrentError] = useState<ErrorType | ''>('');

  const handleHideError = (): void => {
    setCurrentError('');
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(true);
        const data: Todo[] = await getTodos();

        setPreparedTodos(data);
      } catch (error) {
        setCurrentError(ErrorType.Load);
        setTimeout(() => {
          handleHideError();
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, [currentError]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = () => {
    switch (activeFilterStatus) {
      case FilterStatus.Active:
        return preparedTodos.filter(todo => !todo.completed);

      case FilterStatus.Completed:
        return preparedTodos.filter(todo => todo.completed);

      default:
        return preparedTodos;
    }
  };

  const handleChangeFilter = (type: FilterStatus) => {
    setActiveFilterStatus(type);
  };

  const handleCheckTodo = (id: number) => {
    setPreparedTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const quantityActiveTasks = (): number => {
    return preparedTodos.filter(todo => !todo.completed).length;
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: quantityActiveTasks() === 0,
            })}
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

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos().map((todo: Todo) => {
            return (
              <div
                key={todo.id}
                data-cy="Todo"
                className={classNames('todo', { completed: todo.completed })}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() => handleCheckTodo(todo.id)}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>

                {/* Remove button appears only on hover */}
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                {/* overlay will cover the todo while it is being deleted or updated */}
                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  {isLoading && <div className="loader" />}
                </div>
              </div>
            );
          })}
        </section>

        {/* Hide the footer if there are no todos */}
        {preparedTodos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${quantityActiveTasks()} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: activeFilterStatus === FilterStatus.All,
                })}
                data-cy="FilterLinkAll"
                onClick={() => handleChangeFilter(FilterStatus.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: activeFilterStatus === FilterStatus.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => handleChangeFilter(FilterStatus.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: activeFilterStatus === FilterStatus.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => handleChangeFilter(FilterStatus.Completed)}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={quantityActiveTasks() === preparedTodos.length}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !currentError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleHideError}
        />
        {/* show only one message at a time */}
        {currentError}
      </div>
    </div>
  );
};
