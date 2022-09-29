/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef } from 'react';
import classNames from 'classnames';

import { HeaderProps } from './HeaderProps';
import { Error } from '../../Error';

export const Header: React.FC<HeaderProps> = ({
  todoList,
  updateTodoCompleted,
  setError,
  handleSubmit,
  todoTitle,
  setTodoTitle,
  isLoading,
  setLoadingAll,
}) => {
  const newTodoField = useRef<HTMLInputElement>(null);

  const handleChoose = async () => {
    todoList.map((todo) => {
      setLoadingAll(true);

      try {
        if (todo.id) {
          updateTodoCompleted(todo.id, true);

          if (todoList.every(item => item.completed)) {
            updateTodoCompleted(todo.id, false);
          }
        }
      } catch {
        setError(Error.UPDATING);
      }

      return todo;
    });
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.currentTarget.value);
  };

  return (
    <header className="todoapp__header">
      {todoList.length > 0 && (
        <button
          data-cy="ToggleAllButton"
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todoList.every(todo => todo.completed),
          })}
          onClick={handleChoose}
        />
      )}

      <form
        onSubmit={handleSubmit}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          value={todoTitle}
          onInput={handleInput}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          disabled={isLoading}
        />
      </form>
    </header>
  );
};
