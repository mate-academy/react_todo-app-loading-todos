import React from 'react';
import classNames from 'classnames';

interface Props {
  title: string;
  onTitleChange: (title: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  isToggleAllVisible: boolean;
  areAllCompleted: boolean;
  onToggleAll: () => void;
  isAdding: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const Header: React.FC<Props> = ({
  title,
  onTitleChange,
  onSubmit,
  isToggleAllVisible,
  areAllCompleted,
  onToggleAll,
  isAdding,
  inputRef,
}) => {
  return (
    <header className="todoapp__header">
      {isToggleAllVisible && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: areAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={onToggleAll}
          aria-label="Toggle all todos"
        />
      )}

      <form onSubmit={onSubmit}>
        <input
          data-cy="NewTodoField"
          ref={inputRef}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => onTitleChange(e.target.value)}
          disabled={isAdding}
        />
      </form>
    </header>
  );
};
