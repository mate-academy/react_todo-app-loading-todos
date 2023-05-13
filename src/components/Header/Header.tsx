/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

interface Props {
  hasActiveTodos: boolean;
}

export const Header: React.FC<Props> = ({ hasActiveTodos }) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={classNames('todoapp__toggle-all', {
        active: hasActiveTodos,
      })}
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
