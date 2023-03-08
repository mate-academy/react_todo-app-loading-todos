import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  hasActive: boolean;
};

export const Header: React.FC<Props> = ({ hasActive }) => {
  const [title, setTitle] = useState('');

  return (
    <header className="todoapp__header">
      <button
        type="button"
        aria-label="toggle all todos statuses"
        className={classNames('todoapp__toggle-all', {
          active: hasActive,
        })}
        disabled={!hasActive}
      />

      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </form>
    </header>
  );
};
