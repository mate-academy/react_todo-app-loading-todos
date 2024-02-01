/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FormEvent } from 'react';

type Props = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void,
  title: string,
  setTitle: (event:string) => void,
};

export const Header: React.FC <Props> = ({ handleSubmit, title, setTitle }) => {
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleTitleChange}
          value={title}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
