/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef } from 'react';
import classNames from 'classnames';

import { HeaderProps } from './HeaderProps';

export const Header: React.FC<HeaderProps> = ({
  todoList,
  handleSubmit,
  todoTitle,
  setTodoTitle,
  isLoading,
  handleChooseAll,
}) => {
  const newTodoField = useRef<HTMLInputElement>(null);

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
          onClick={handleChooseAll}
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
