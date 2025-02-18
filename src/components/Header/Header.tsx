import classNames from 'classnames';
import { FC } from 'react';
import { Todo } from '../../types/Todo';

const verifyActiveTodos = (todos: Todo[]) => {
  return todos.every(todo => todo.completed);
};

type Props = {
  todos: Todo[];
};

export const Header: FC<Props> = ({ todos }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: verifyActiveTodos(todos),
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          autoFocus
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
