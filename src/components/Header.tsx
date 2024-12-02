import React from 'react';

interface Props {
  value: string;
  setValue: (str: string) => void;
  onSubmit: (event: React.FormEvent) => void;
}

export const Header: React.FC<Props> = ({ value, setValue, onSubmit }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all"
        data-cy="ToggleAllButton"
      />
      <form onSubmit={onSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </form>
    </header>
  );
};

export default Header;
