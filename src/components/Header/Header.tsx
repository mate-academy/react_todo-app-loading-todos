import React from 'react';
import cn from 'classnames';

type Props = {
  hasTodos: number,
  hasActiveTodos: number,
};

export const Header: React.FC<Props> = React.memo(({
  hasTodos,
  hasActiveTodos,
}) => (
  <header className="todoapp__header">
    {hasTodos !== 0 && (
      <button
        type="button"
        aria-label="toggle todos butoon"
        className={cn(
          'todoapp__toggle-all',
          { active: !hasActiveTodos },
        )}
      />
    )}

    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
));
