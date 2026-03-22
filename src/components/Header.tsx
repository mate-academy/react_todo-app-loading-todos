import React from 'react';
import classNames from 'classnames';

type Props = {
  newTodoFieldRef: React.RefObject<HTMLInputElement>;
  hasTodos: boolean;
  activeTodosCount: number;
};

export const Header: React.FC<Props> = ({
  newTodoFieldRef,
  hasTodos,
  activeTodosCount,
}) => {
  return (
    <>
      <h1 className="todoapp__title">todos</h1>

      {hasTodos && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: activeTodosCount === 0,
          })}
          data-cy="ToggleAllButton"
        />
      )}

      <form>
        <input
          ref={newTodoFieldRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </>
  );
};
