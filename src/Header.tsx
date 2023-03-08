import classnames from 'classnames';
import { useMemo } from 'react';
import { Todo } from './types/Todo';

type Props = {
  query: string,
  setQuery: (query: string) => void,
  todos: Todo[],
};

export const Header: React.FC<Props> = ({
  query,
  setQuery,
  todos,
}) => {
  const activeTodos = useMemo(
    () => todos.filter(todo => !todo.completed),
    [todos],
  );

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classnames(
          'todoapp__toggle-all',
          { active: activeTodos },
        )}
        aria-label="Add todo"
      />

      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
