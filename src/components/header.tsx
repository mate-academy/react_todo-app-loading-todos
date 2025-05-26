import React from 'react';
import classNames from 'classnames';

type Props = {
  allCompleted: boolean;
  onToggleAll: () => void;
  newTitle: string;
  setNewTitle: (title: string) => void;
  onAddTodo: (title: string) => void;
  clearError: () => void;
};

export const Header: React.FC<Props> = ({
  allCompleted,
  onToggleAll,
  newTitle,
  setNewTitle,
  onAddTodo,
  clearError,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTodo(newTitle);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', { active: allCompleted })}
        data-cy="ToggleAllButton"
        onClick={onToggleAll}
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={handleChange}
          onFocus={clearError}
        />
      </form>
    </header>
  );
};
