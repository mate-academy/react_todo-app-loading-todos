import { FC } from 'react';

interface TodoContentHeaderProps {
  isHasActiveTodos: boolean,
}

export const TodoContentHeader
: FC<TodoContentHeaderProps> = ({ isHasActiveTodos }) => {
  return (
    <header className="todoapp__header">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        disabled={isHasActiveTodos}
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
