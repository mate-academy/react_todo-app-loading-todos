/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

interface Props {
  onSubmit: (event: React.FormEvent) => void,
  inputValue: string,
  changeInputValue: (el: string) => void,
}

export const Header: React.FC<Props> = ({
  onSubmit,
  inputValue,
  changeInputValue,
}) => (
  <header className="todoapp__header">
    <button
      type="button"
      className="todoapp__toggle-all active"
      data-cy="ToggleAllButton"
    />

    <form onSubmit={event => onSubmit(event)}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        value={inputValue}
        onChange={event => changeInputValue(event.target.value)}
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
