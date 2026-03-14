import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  areAllCompleted: boolean;
};

export const TodoHeader: React.FC<Props> = ({ todos, areAllCompleted }) => {
  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', { active: areAllCompleted })}
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={event => event.preventDefault()}>
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
