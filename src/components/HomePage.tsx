/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api/todos';
import classNames from 'classnames';
import TodoMain from './TodoMain';

export enum Errors {
  FetchError = 'Unable to load todos',
  EmptyTitle = 'Title should not be empty',
  AddTodo = 'Unable to add a todo',
  DeleteTodo = 'Unable to delete a todo',
  UpdateTodo = 'Unable to update a todo',
}

function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Errors | null>(null);
  const isError = !!error;
  const allCompleted = todos.every(todo => todo.completed);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch (err) {
        setError(Errors.FetchError);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    let timer = 0;

    if (isError) {
      timer = window.setTimeout(() => {
        setError(null);
      }, 3000);

      return () => {
        window.clearTimeout(timer);
      };
    }
  }, [isError]);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const title = formData.get('todo') as string;

    if (!title.trim()) {
      setError(Errors.EmptyTitle);
    }
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all hidden', {
                active: allCompleted,
              })}
              data-cy="ToggleAllButton"
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              name="todo"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>
      </div>
      <TodoMain todos={todos} />
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(null)}
        />
        {error}
      </div>
    </div>
  );
}

export default HomePage;
