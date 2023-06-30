import React, { memo } from 'react';
import cn from 'classnames';

interface HeaderProps {
  isSomeActiveTodos: boolean;
}

export const Header: React.FC<HeaderProps> = memo(({ isSomeActiveTodos }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <header className="todoapp__header">
      {isSomeActiveTodos && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          type="button"
          className={cn(
            'todoapp__toggle-all', {
              active: isSomeActiveTodos,
            },
          )}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
});
