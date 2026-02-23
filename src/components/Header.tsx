import React, { forwardRef } from 'react';
import cn from 'classnames';

type Props = {
  query: string;
  setQuery: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  isToggleAllActive: boolean;
};

export const Header = forwardRef<HTMLInputElement, Props>(
  ({ query, setQuery, onSubmit, isToggleAllActive }, ref) => (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: isToggleAllActive,
        })}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={onSubmit}>
        <input
          ref={ref}
          value={query}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => setQuery(event.target.value)}
        />
      </form>
    </header>
  ),
);

Header.displayName = 'Header';
