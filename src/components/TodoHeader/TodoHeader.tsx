import './TodoHeader.scss';
import React, { useEffect, useRef } from 'react';

interface Props {
  userInput: string;
  onFieldChange: (value: string) => void;
}

export const TodoHeader = ({ userInput, onFieldChange }: Props) => {
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    newTodoField.current?.focus();
  }, []);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange(event.target.value);
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
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={newTodoField}
          onChange={handleFieldChange}
          value={userInput}
        />
      </form>
    </header>
  );
};
