import React from 'react';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>,
  onHandleInput: React.ChangeEventHandler<HTMLInputElement>,
  inputValue: string;
};

export const Header: React.FC<Props> = ({
  newTodoField,
  onHandleInput,
  inputValue,
}) => {
  return (
    <header className="todoapp__header">
      <button
        aria-label="toggle_button"
        id="toggle_button"
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          value={inputValue}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={onHandleInput}
        />
      </form>
    </header>
  );
};
