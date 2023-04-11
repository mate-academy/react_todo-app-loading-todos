import React from 'react';

type Props = {
  activeTodosLength: number,
};

export const Header: React.FC<Props> = ({ activeTodosLength }) => {
  return (
    <header className="todoapp__header">
      {activeTodosLength !== 0 && (
        /* eslint-disable jsx-a11y/control-has-associated-label */
        <button type="button" className="todoapp__toggle-all active" />
      )}

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
};
