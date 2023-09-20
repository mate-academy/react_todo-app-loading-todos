import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
};

export const TodoAppHeader: React.FC<Props> = ({ todos }) => (
  <header className="todoapp__header">
    {/* this buttons is active only if there are some active todos */}
    {Boolean(todos.length) && (
      // eslint-disable-next-line jsx-a11y/control-has-associated-label
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />
    )}

    {/* Add a todo on form submit */}
    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
