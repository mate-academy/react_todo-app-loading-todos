import classNames from 'classnames';
import React, { useState } from 'react';

interface Props {
  isActive: boolean;
}

export const Header: React.FC<Props> = React.memo(({ isActive }) => {
  const [taskInput, setTaskInput] = useState('');
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(event.target.value);
  };

  return (
    <header className="todoapp__header">

      <button
        type="button"
        aria-label="button"
        className={classNames('todoapp__toggle-all',
          { active: isActive })}
      />

      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          aria-label="new todo"
          value={taskInput}
          onChange={handleInput}
        />
      </form>
    </header>
  );
});
