import React from 'react';

type Props = {
  heandleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  title: string,
  onAdd: (event: React.ChangeEvent<HTMLInputElement>) => void,
  newTodoField: React.RefObject<HTMLInputElement>,
};

export const Header: React.FC<Props> = ({
  heandleSubmit, title, onAdd, newTodoField,
}) => {
  return (
    <header className="todoapp__header">
      <button
        aria-label="all-check"
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
      />

      <form onSubmit={heandleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={onAdd}
        />
      </form>
    </header>
  );
};
