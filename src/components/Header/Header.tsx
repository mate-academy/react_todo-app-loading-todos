/* eslint-disable jsx-a11y/control-has-associated-label */
import { LegacyRef } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  newTodoField: LegacyRef<HTMLInputElement>;
};

export const Header: React.FC<Props> = ({ todos, newTodoField }) => {
  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          data-cy="ToggleAllButton"
          type="button"
          className="todoapp__toggle-all active"
        />
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
