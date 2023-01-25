import React from 'react';

type Props = {
  title: string,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  handleAdd: (event: React.ChangeEvent<HTMLInputElement>) => void,
  newTodoField: React.RefObject<HTMLInputElement>,
};

export const Header: React.FC<Props> = ({
  title,
  handleSubmit,
  handleAdd,
  newTodoField,
}) => {
  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
        aria-label="all-check"
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleAdd}
        />
      </form>
    </header>
  );
};
