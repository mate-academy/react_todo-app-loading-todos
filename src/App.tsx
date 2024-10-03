/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import * as todoService from './api/todos';
import { Todo } from './types/Todo';

enum LinkMode {
  all = '',
  active = 'active',
  completed = 'completed',
}

function getVisibleTodos(todos: Todo[], link: LinkMode) {
  switch (link) {
    case LinkMode.active:
      return todos.filter(todo => !todo.completed);

    case LinkMode.completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
}

function getTodosCount(todos: Todo[]) {
  const all = todos.length;
  const active = todos.reduce(
    (sum, todo) => (todo.completed ? sum : sum + 1),
    0,
  );
  const completed = all - active;

  return { all, active, completed };
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const todosCount = getTodosCount(todos);

  const [activeLink, setActiveLink] = useState(LinkMode.all);
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const cleanError = () => {
    setTimeout(() => setErrorMessage(''), 3000);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      cleanError();
      setErrorMessage('Title should not be empty');

      return;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const changeActiveLink = (link: LinkMode) => {
    setActiveLink(link);
  };

  const changeTodoStatus = (todo: Todo) => {
    setTodos(currentTodos => {
      return currentTodos.map(currentTodo => {
        if (currentTodo.id === todo.id) {
          return { ...currentTodo, completed: !currentTodo.completed };
        }

        return currentTodo;
      });
    });
  };

  useEffect(() => {
    setErrorMessage('');

    todoService
      .getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setTodos(todosFromServer);
      })
      .catch(() => {
        setErrorMessage(() => {
          cleanError();

          return 'Unable to load todos';
        });
        throw new Error();
      });
  }, []);

  return (
    <>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <header className="todoapp__header"></header>
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: todosCount.all === todosCount.completed,
            })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              autoFocus
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </form>
        </div>

        <section className="todoapp__main" data-cy="TodoList">
          {getVisibleTodos(todos, activeLink)?.map(todo => (
            <div
              data-cy="Todo"
              className={cn('todo', { completed: todo.completed })}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => changeTodoStatus(todo)}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>

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

        {todosCount.all > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${[todosCount.active]} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              {Object.entries(LinkMode).map(entry => {
                const [name, link] = entry;
                const capitalizeName = name[0].toUpperCase() + name.slice(1);

                return (
                  <a
                    href={`#/${link}`}
                    className={cn('filter__link', {
                      selected: activeLink === link,
                    })}
                    data-cy={`FilterLink${capitalizeName}`}
                    key={link}
                    onClick={() => changeActiveLink(link)}
                  >
                    {capitalizeName}
                  </a>
                );
              })}
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todosCount.all === todosCount.active}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
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
    </>
  );
};
