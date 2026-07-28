import React from 'react';
import classNames from 'classnames';

interface Props {
  isEveryCompleted: boolean;
  title: string;
  setTitle: (title: string) => void;
}

export const Header: React.FC<Props> = ({
  isEveryCompleted,
  title,
  setTitle,
}) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={classNames('todoapp__toggle-all', {
        active: isEveryCompleted,
      })}
      data-cy="ToggleAllButton"
    />

    <form onSubmit={e => e.preventDefault()}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
    </form>
  </header>
);
