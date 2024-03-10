/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { USER_ID } from '../api/todos';
import { Todo } from '../types/Todo';
import { Errors } from '../types/Errors';

type Props = {
  todos: Todo[];
  updateTodos: (todoItems: Todo[]) => void;
  addErrorText: (errorMessage: Errors | null) => void;
};

export const TodoApp: React.FC<Props> = ({
  todos,
  updateTodos,
  addErrorText,
}) => {
  const [query, setQuery] = useState<string>('');
  const newTodoField = useRef<HTMLInputElement | null>(null);

  const isEveryTodoCompleted = todos.every(todoItem => todoItem.completed);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const handleQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!query.trim()) {
      addErrorText(Errors.emptyTitle);

      window.setTimeout(() => addErrorText(null), 3000);

      return;
    }

    updateTodos([
      ...todos,
      {
        id: +new Date(),
        userId: USER_ID,
        title: query.trim(),
        completed: false,
      },
    ]);

    setQuery('');
  };

  const handleToggleAllTodos = () => {
    if (isEveryTodoCompleted) {
      updateTodos(
        todos.map(todoItem => ({
          ...todoItem,
          completed: false,
        })),
      );
    } else {
      updateTodos(
        todos.map(todoItem => ({
          ...todoItem,
          completed: true,
        })),
      );
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}

      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isEveryTodoCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAllTodos}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={newTodoField}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleQueryChange}
        />
      </form>
    </header>
  );
};
