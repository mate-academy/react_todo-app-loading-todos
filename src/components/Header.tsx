import React from 'react';

type Props = {
  allCompleted: boolean;
  title: string;
  toggleAll: () => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Header: React.FC<Props> = ({
  allCompleted,
  toggleAll,
  title,
  handleTitleChange,
}) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
        onClick={toggleAll}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={event => event.preventDefault()}>
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
