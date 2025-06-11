import React from 'react';

interface HeaderProps {
  inputForAddTodo: string;
  onChangeInput: (inputForAddTodo: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  inputForAddTodo,
  onChangeInput,
}) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form /* onSubmit={addTodo} */>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputForAddTodo}
          onChange={event => onChangeInput(event.target.value)}
        />
      </form>
    </header>
  );
};
