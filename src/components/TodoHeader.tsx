import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
};

export const TodoHeader: React.FC<Props> = ({ todos }) => {
  const isAllCopleted = todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', { active: isAllCopleted })}
        data-cy="ToggleAllButton"
      />

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
