/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';
import { QueryType } from './types/QueryType';

export const App: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  const [query, setQuery] = useState<QueryType>(QueryType.All);

  const addTodo = () => {
    if (!title) {
      return;
    }

    const id = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: id,
      userId: USER_ID,
      title: title,
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  const filterTodos = (todosArg: Todo[], queryArg: QueryType) => {
    setVisibleTodos(() =>
      todosArg.filter(todo => {
        switch (queryArg) {
          case QueryType.Active:
            return !todo.completed;
          case QueryType.Completed:
            return todo.completed;
        }

        return todos;
      }),
    );
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    if (!title) {
      setErrorMessage('Title should not be empty');
    }

    addTodo();
    setTitle('');
  };

  const handleDoubleClick = (todo: Todo) => {
    setSelectedTitle(todo.title);
    setSelected(todo.id);
  };

  useEffect(() => {
    filterTodos(todos, query);
  }, [query, todos]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        setLoading(true);
        setErrorMessage('');

        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setErrorMessage('Unable to load todos');
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
    inputRef.current?.focus();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length ? (
            <button
              type="button"
              disabled={isSubmitting}
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          ) : (
            ''
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              value={title}
              onChange={event => setTitle(event.target.value)}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => {
            return (
              <div
                data-cy="Todo"
                className={cn('todo ', { completed: todo.completed })}
                key={todo.id}
                onDoubleClick={() => handleDoubleClick(todo)}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                  />
                </label>
                {todo.id === selected ? (
                  <form>
                    <input
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      value={selectedTitle}
                      onChange={event => setSelectedTitle(event.target.value)}
                    />
                  </form>
                ) : (
                  <>
                    <span data-cy="TodoTitle" className="todo__title">
                      {todo.title}
                    </span>

                    <button
                      type="button"
                      className="todo__remove"
                      data-cy="TodoDelete"
                      disabled={isSubmitting}
                    >
                      ×
                    </button>
                  </>
                )}

                {/* overlay will cover the todo while it is being deleted or updated */}
                {loading && (
                  <div data-cy="TodoLoader" className="modal overlay">
                    {/* eslint-disable-next-line max-len */}
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                )}
              </div>
            );
          })}

          {/* <div data-cy="Todo" className="todo">
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
                value="Todo is being edited now"
              />
            </form>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}

          {/* This todo is in loading state */}
          {/* <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Todo is being saved now
            </span>

            <button
              disabled={isSubmitting}
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
            >
              ×
            </button>

            {/* 'is-active' class puts this modal on top of the todo
            <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />

              {loading && <div className="loader" />}
            </div>
          </div> */}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length ? (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                onClick={() => setQuery(QueryType.All)}
                href="#/"
                className={cn('filter__link', {
                  selected: query === QueryType.All,
                })}
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                onClick={() => setQuery(QueryType.Active)}
                href="#/active"
                className={cn('filter__link', {
                  selected: query === QueryType.Active,
                })}
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                onClick={() => setQuery(QueryType.Completed)}
                href="#/completed"
                className={cn('filter__link', {
                  selected: query === QueryType.Completed,
                })}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={isSubmitting}
            >
              Clear completed
            </button>
          </footer>
        ) : (
          ''
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        hidden={!errorMessage}
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button
          onClick={() => setErrorMessage('')}
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          disabled={!errorMessage}
        />
        {/* show only one message at a time */}
        {errorMessage}
        {/* Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
