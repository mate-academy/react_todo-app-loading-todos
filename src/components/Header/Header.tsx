import React, { useState } from 'react';
import cn from 'classnames';

type Props = {
  someActiveTodos: number,
};

export const Header: React.FC<Props> = ({ someActiveTodos }) => {
  const [title, setTitle] = useState('');

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        aria-label="button"
        className={cn('todoapp__toggle-all', {
          active: !someActiveTodos,
        })}
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          value={title}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
