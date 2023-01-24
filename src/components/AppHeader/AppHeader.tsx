/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React from 'react';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>,
  isAllCompleted: boolean,
};

export const AppHeader: React.FC<Props> = ({
  newTodoField,
  isAllCompleted,
}) => {
  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        className={classNames('todoapp__toggle-all',
          { active: isAllCompleted })}
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
