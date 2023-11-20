/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Sort } from './types/Sort';

const USER_ID = 11932;

type ErrorMessageType = React.Dispatch<React.SetStateAction<string | null>>;
type MessageType = string;

const handleErrorMessage = (
  setErrorMessage: ErrorMessageType,
  message: MessageType,
) => {
  setErrorMessage(message);
  setTimeout(() => {
    setErrorMessage(null);
  }, 3000);
};

const filterTodos = (todos: Todo[], sortType: Sort) => {
  const newTodo = [...todos];

  switch (sortType) {
    case Sort.Active:
      return newTodo.filter(todo => !todo.completed);
    case Sort.Completed:
      return newTodo.filter(todo => todo.completed);
    default:
      return newTodo;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState(Sort.All);
  const [isEditing, setIsEditing] = useState<Record<number, boolean>>({});

  const visibleTodos = useMemo(() => {
    return filterTodos(todos, selectedFilter);
  }, [todos, selectedFilter]);

  const handleToggleEditing = (id: number) => {
    setIsEditing((prevIsEditing) => ({
      ...prevIsEditing,
      [id]: !prevIsEditing[id],
    }));
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos(USER_ID);

        setTodos(fetchedTodos);
      } catch (error) {
        if (error instanceof Error) {
          handleErrorMessage(setErrorMessage,
            error.message || 'Unable to load todos');
        } else {
          handleErrorMessage(setErrorMessage, 'Unable to load todos');
        }
      }
    };

    fetchTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const isActiveTodo = todos.every(todo => !todo.completed);
  const unComletedTodo = todos.filter(todo => !todo.completed).length;

  const isShownFooter = todos.length > 0 && (
    selectedFilter === Sort.All
    || (selectedFilter === Sort.Active && unComletedTodo > 0)
    || (selectedFilter === Sort.Completed
      && unComletedTodo < todos.length)
    || isActiveTodo
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {visibleTodos.length > 0 && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        {visibleTodos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {visibleTodos.map((todo) => (
              <div key={todo.id} data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                  />
                </label>
                {isEditing[todo.id] ? (
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value={todo.title}
                  />
                ) : (
                  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onClick={() => handleToggleEditing(todo.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleToggleEditing(todo.id);
                      }
                    }}
                  >
                    {todo.title}
                  </span>
                )}
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
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
        )}

        {isShownFooter && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {unComletedTodo}
              {' '}
              {unComletedTodo === 1 ? 'item' : 'items'}
              {' '}
              left
            </span>
            <nav className="filter" data-cy="Filter">

              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: selectedFilter === Sort.All,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setSelectedFilter(Sort.All)}
              >
                All
              </a>
              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: selectedFilter === Sort.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setSelectedFilter(Sort.Active)}
              >
                Active
              </a>
              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: selectedFilter === Sort.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setSelectedFilter(Sort.Completed)}
              >
                Completed
              </a>

            </nav>
            {!isActiveTodo && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${errorMessage ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(null)}
        />
        {errorMessage}
      </div>

    </div>
  );
};
