import React, { useContext } from 'react';
import cn from 'classnames';
import { StateContext } from '../context/ContextReducer';

export const TodoAppHeader: React.FC = () => {
  const { selectedAll } = useContext(StateContext);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={cn('todoapp__toggle-all', { active: selectedAll })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
