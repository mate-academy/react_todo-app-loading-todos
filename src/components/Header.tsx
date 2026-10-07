import React from 'react';
import classNames from 'classnames';

type Props = {
  hasTodos: boolean;
  allTodosCompleted: boolean;
  title: string;
  inputRef: React.RefObject<HTMLInputElement>;
  onTitleChange: (title: string) => void;
};

export const Header: React.FC<Props> = ({
  hasTodos,
  allTodosCompleted,
  title,
  inputRef,
  onTitleChange,
}) => (
  <header className="todoapp__header">
    {hasTodos && (
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: allTodosCompleted,
        })}
        data-cy="ToggleAllButton"
        aria-label="Toggle all todos"
        disabled
      />
    )}

    <form onSubmit={event => event.preventDefault()}>
      <input
        ref={inputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        aria-label="New todo title"
        value={title}
        onChange={event => onTitleChange(event.target.value)}
      />
    </form>
  </header>
);
