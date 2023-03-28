import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  query: string;
  onFormInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Header: React.FC<Props> = ({ todos, query, onFormInputChange }) => {
  const activeTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: activeTodos },
        )}
        aria-label="Add todo"
      />

      <form>
        <input
          className="todoapp__new-todo"
          type="text"
          placeholder="What needs to be done?"
          value={query}
          onChange={onFormInputChange}
        />
      </form>
    </header>
  );
};

export default Header;
