import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  filteredTodo: Todo[];
};

export const Header: React.FC<Props> = ({ filteredTodo }) => {
  const toogleCheckbox = useMemo(() => {
    return filteredTodo.every(todo => todo.completed);
  }, [filteredTodo]);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: toogleCheckbox,
        })}
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
