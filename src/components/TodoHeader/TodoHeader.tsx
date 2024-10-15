import { FC } from 'react';
import cn from 'classnames';
import './TodoHeader.scss';

interface Props {
  leftTodos: number;
  todosAmount: number;
}

export const TodoHeader: FC<Props> = ({ leftTodos, todosAmount }) => {
  return (
    <header className="todoapp__header">
      {!!todosAmount && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: leftTodos === 0,
          })}
          data-cy="ToggleAllButton"
        />
      )}

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
