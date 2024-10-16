import { FC } from 'react';
import cn from 'classnames';

type Props = {
  uncompletedTodosAmount: number;
  todosLength: number;
};

export const Header: FC<Props> = ({ uncompletedTodosAmount, todosLength }) => {
  return (
    <header className="todoapp__header">
      {!!todosLength && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: uncompletedTodosAmount === 0,
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
