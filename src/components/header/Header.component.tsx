import React from 'react';
import { HeaderTypes } from './Header.types';
import { text } from '../../constants/text';

export const HeaderComponent: React.FC<HeaderTypes> = () => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        onClick={() => {}}
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
          placeholder={text.whatNeedsToBeDone}
        />
      </form>
    </header>
  );
};
