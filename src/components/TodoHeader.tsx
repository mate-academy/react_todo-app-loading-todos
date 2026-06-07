import React from 'react';

interface Props {
  title: string;
  setTitle: (val: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

export const TodoHeader: React.FC<Props> = ({
  title,
  setTitle,
  handleSubmit,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
