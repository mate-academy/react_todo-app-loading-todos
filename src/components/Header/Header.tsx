import React, { useState } from 'react';
import { ErrorMessageEnum } from '../../types/ErrorMessageEnum';

interface Props {
  setErrorMessage: (errorMessage: ErrorMessageEnum) => void;
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const Header: React.FC<Props> = ({ setErrorMessage = () => {} }) => {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.length) {
      setErrorMessage(ErrorMessageEnum.TitleError);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={handleChange}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

// {/* this buttons is active only if there are some active todos */}
// {/* Add a todo on form submit */}
