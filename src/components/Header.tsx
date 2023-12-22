import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[];
}

export const Header: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <header className="todoapp__header">
      <button
        aria-label="Toggle All"
        type="button"
        className={cn(
          'todoapp__toggle-all',
          { active: todos.every(todo => todo.completed) },
        )}
        data-cy="ToggleAllButton"
      />

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
