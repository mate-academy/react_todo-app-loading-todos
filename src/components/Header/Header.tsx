import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const Header: React.FC<Props> = ({ todos }) => {
  const isButtonActive = todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {todos.length !== 0 && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: isButtonActive,
          })}
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
};
