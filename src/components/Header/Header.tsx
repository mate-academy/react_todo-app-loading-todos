import React from 'react';
import './Header.scss';

type Props = {
  inputValue: string;
  onChangeInputValue: (inputValue: string) => void;
};

export const Header: React.FC<Props> = ({
  inputValue,
  onChangeInputValue = () => {},
}) => {
  const handleChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChangeInputValue(event.target.value);
  };

  const handleSubmitInputForm = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmitInputForm}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={handleChangeInputValue}
        />
      </form>
    </header>
  );
};
