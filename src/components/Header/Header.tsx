import React from 'react';

type Props = {
  handleSubmit: (e: React.FormEvent) => void
  handleTitleChange: (value: string) => void
  newTodoField: React.RefObject<HTMLInputElement>
  todoTitle: string,
};

export const Header: React.FC<Props> = ({
  handleSubmit,
  handleTitleChange,
  newTodoField,
  todoTitle,
}) => {
  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        aria-label="Toggle All"
        type="button"
        className="todoapp__toggle-all active"
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={(e) => handleTitleChange(e.target.value.trimStart())}
        />
      </form>
    </header>
  );
};
