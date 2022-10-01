import { RefObject } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  query: string,
  setQuery: (value: string) => void,
  newTodoField: RefObject<HTMLInputElement>;
  todos: Todo[],
};

export const Header: React.FC<Props> = ({
  query,
  setQuery,
  newTodoField,
  todos,
}) => {
  return (
    <header className="todoapp__header">
      {todos.length > 0
        && (
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
            aria-label="toggleButton"
          />
        )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
