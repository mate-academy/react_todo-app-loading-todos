import React from 'react';
import classNames from 'classnames';
// import { Todo } from '../types/Todo';

type Props = {
  activeTodosNum: number;
};

const Header: React.FC<Props> = ({ activeTodosNum }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: activeTodosNum === 0 },
        )}
        aria-label="Toggle all todos"
      />

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

export default Header;
