import React, { useState } from "react";
import { TodoError } from "../../enum/TodoError/TodoError";

type Props = {
  setErrorMesage: (value: string) => void,
};

export const Header: React.FC<Props> = ({ setErrorMesage }) => {
  const [quryInput, setQuryInput] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quryInput) {
      return setErrorMesage(TodoError.TitleEmpti)
    }

    setQuryInput('');
  };

  return (
    <header className="todoapp__header">
    <button
      type="button"
      className="todoapp__toggle-all active"
      data-cy="ToggleAllButton"
    />

    <form
      onSubmit={onSubmit}
    >
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={quryInput}
        onChange={(e) => setQuryInput(e.target.value)}
      />
    </form>
  </header>
  );
};
