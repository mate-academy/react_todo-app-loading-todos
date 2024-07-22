import classNames from 'classnames';
import React from 'react';

type Props = {
  checkCompleted: boolean;
};

export const HeaderTodos: React.FC<Props> = ({ checkCompleted }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: checkCompleted,
        })}
        data-cy="ToggleAllButton"
      />

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
