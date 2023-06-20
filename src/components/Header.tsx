/* eslint-disable jsx-a11y/control-has-associated-label */
import { useMemo } from 'react';
import { Todo } from '../types/Todo';

interface HeaderProps {
  todos: Todo[],
}

export const Header: React.FC<HeaderProps> = ({ todos }) => {
  const hasActive = useMemo(() => {
    return todos.some(todo => !todo.completed);
  }, [todos]);

  return (
    <header className="todoapp__header">
      {hasActive && (
        <button type="button" className="todoapp__toggle-all active" />
      )}

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
