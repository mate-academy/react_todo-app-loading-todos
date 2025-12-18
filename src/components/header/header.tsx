import classNames from 'classnames';
import React from 'react';

interface Props {
  handleToggleAll: () => void;
  handleSubmit: (event: React.FormEvent) => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  allCompleted: boolean;
  title: string;
}

export const TodoHeader: React.FC<Props> = ({
  handleSubmit,
  handleTitleChange,
  handleToggleAll,
  allCompleted,
  title,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: allCompleted,
        })}
        onClick={handleToggleAll}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitleChange}
          autoFocus
        />
      </form>
    </header>
  );
};
