/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';

export const App: React.FC = () => {
  const [todoData, setTodoData] = useState<Todo[]>([]);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [filterParam, setFilterParam] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');

  const activeTodos = todoData.filter(todo => !todo.completed).length;
  const isCompletedTodos = todoData.some(todo => todo.completed);
  const isAllTodosCompleted =
    todoData.length > 0 && todoData.every(todo => todo.completed);
  const isOverlayActive = false;

  const createErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodoData)
      .catch(() => createErrorMessage('Unable to load todos'));
  }, []);

  useEffect(() => {
    setTodoList(todoData);
  }, [todoData]);

  const handleFilter = (filter: string) => {
    setFilterParam(filter);
    setTodoList(
      todoData.filter(todo => {
        switch (filter) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return true;
        }
      }),
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const title = todoTitle.trim();

    if (!title) {
      createErrorMessage('Title should not be empty');

      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      userId: USER_ID || 0,
      title,
      completed: false,
    };

    setTodoData(current => [...current, newTodo]);
    setTodoTitle('');
  };

  const handleDelete = (id: number) => {
    setTodoData(current => current.filter(todo => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodoData(current => current.filter(todo => !todo.completed));
  };

  const handleSwitchStatus = (currentId: number) => {
    setTodoData(current =>
      current.map(todo =>
        todo.id === currentId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp__content">
      <h1 className="todoapp__title">Todo App</h1>

      <header className="todoapp__header">
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: isAllTodosCompleted,
          })}
          data-cy="ToggleAllButton"
        />

        <form onSubmit={handleSubmit}>
          <input
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={event => setTodoTitle(event.target.value)}
          />
        </form>
      </header>

      <section className="todoapp__main" data-cy="TodoList">
        {todoList.map(({ id, title, completed }) => (
          <div key={id} data-cy="Todo" className={cn('todo', { completed })}>
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={completed}
                onChange={() => handleSwitchStatus(id)}
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => handleDelete(id)}
            >
              ×
            </button>

            <div
              data-cy="TodoLoader"
              className={cn('modal', 'overlay', {
                'is-active': isOverlayActive,
              })}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        ))}
      </section>

      {todoData.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${activeTodos} items left`}
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={cn('filter__link', {
                selected: filterParam === 'all',
              })}
              data-cy="FilterLinkAll"
              onClick={() => handleFilter('all')}
            >
              All
            </a>
            <a
              href="#/active"
              className={cn('filter__link', {
                selected: filterParam === 'active',
              })}
              data-cy="FilterLinkActive"
              onClick={() => handleFilter('active')}
            >
              Active
            </a>
            <a
              href="#/completed"
              className={cn('filter__link', {
                selected: filterParam === 'completed',
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => handleFilter('completed')}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={!isCompletedTodos}
            onClick={handleClearCompleted}
          >
            Clear completed
          </button>
        </footer>
      )}

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
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
    </div>
  );
};
