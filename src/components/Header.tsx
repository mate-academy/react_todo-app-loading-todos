import classNames from 'classnames';
import React from 'react';

type Props = {
  isEveryCompletedTodo: boolean;
};

const HeaderComponent: React.FC<Props> = ({ isEveryCompletedTodo }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: isEveryCompletedTodo,
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          autoFocus
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

export const Header = React.memo(HeaderComponent);
