/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React from 'react';

type Props = {
  hasTodos: boolean;
  allTodosCompleted: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const TodoAppHeader: React.FC<Props> = ({
  hasTodos,
  allTodosCompleted,
  inputRef,
}) => (
  <header className="todoapp__header">
    {hasTodos && (
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: allTodosCompleted,
        })}
        data-cy="ToggleAllButton"
      />
    )}

    <form>
      <input
        ref={inputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
