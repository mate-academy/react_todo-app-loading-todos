import { FC } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
}

const Header: FC<Props> = ({ todos }) => {
  const isAllTodosCompleted = todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: isAllTodosCompleted,
        })}
        data-cy="ToggleAllButton"
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    </header>
  );
};

export default Header;
