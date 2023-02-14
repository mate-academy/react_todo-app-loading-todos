import React from 'react';
import classNames from 'classnames';

type Props = {
  activeTodosNum: number;
};

export const TodoHeader: React.FC<Props> = React.memo(({ activeTodosNum }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: activeTodosNum === 0,
        })}
        aria-label="Toggle all todos"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
});
