/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import * as todosServise from './api/todos';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { SelectedBy } from './types/SelectedBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedBy, setSelectedBy] = useState<SelectedBy>(SelectedBy.all);
  const [errorMessage, setErrorMessage] = useState('');
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    field.current?.focus();
  }, [
    todos,
  ]);

  const filteredTodos = todos.filter(todo =>
    selectedBy === SelectedBy.completed
      ? todo.completed
      : !todo.completed,
  )

  const loadingTodos = () => {
    todosServise
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  };

  useEffect(() => {
    loadingTodos();
  }, []);

  if (!todosServise.USER_ID) {
    return <UserWarning />;
  }

  const activeTodosLength = todos.reduce((sum: number, currTodo: Todo) => {
    return currTodo.completed ? sum : sum + 1;
  }, 0);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: todos.every(todo => todo.completed),
            })}
            data-cy="ToggleAllButton"
          />

          <form
          >
            <input
              data-cy="NewTodoField"
              type="text"
              ref={field}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {(selectedBy === SelectedBy.all ? todos : filteredTodos)
                .map(todo => (
                  <div
                    data-cy="Todo"
                    key={todo.id}
                    className={classNames('todo', {
                      completed: todo.completed,
                    })}
                  >
                    <label className="todo__status-label">
                      <input
                        data-cy="TodoStatus"
                        type="checkbox"
                        className="todo__status"
                        checked={todo.completed}
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
                      data-cy="TodoDelete"
                    >
                      ×
                    </button>


                    <div
                      data-cy="TodoLoader"
                      className="modal overlay"
                    >
                      <div
                        className="
                        modal-background
                        has-background-white-ter
                      "
                      />
                      <div className="loader" />
                    </div>
                  </div>
                ))}

            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {activeTodosLength} items left
              </span>

              <nav className="filter" data-cy="Filter">
                {Object.values(SelectedBy).map(value => (
                  <a
                    key={value}
                    href={`#/${value}`}
                    className={classNames('filter__link', {
                      selected: selectedBy === value,
                    })}
                    onClick={() => setSelectedBy(value)}
                    data-cy={`FilterLink${value}`}
                  >
                    {value}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={activeTodosLength === todos.length}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !errorMessage,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
