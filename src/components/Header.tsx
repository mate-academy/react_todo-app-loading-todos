import React from 'react';
import classNames from 'classnames';
// import { Todo } from '../types/Todo';

type Props = {
  activeTodos: number;
};

const Header: React.FC<Props> = ({ activeTodos }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: !!activeTodos },
        )}
        aria-label="Add todo"
      />

      <form>
        <input
          className="todoapp__new-todo"
          type="text"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

export default Header;
