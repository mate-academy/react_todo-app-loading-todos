import classNames from 'classnames';
import { FC, memo, useEffect, useMemo, useRef } from 'react';
import { Todo } from '../types';

type Props = {
  todos: Todo[];
};

export const Header: FC<Props> = memo(({ todos }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const isAllTodosCompleted = useMemo(
    () => todos.every(({ completed }) => completed),
    [todos],
  );

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all ', {
          active: isAllTodosCompleted,
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
          ref={inputRef}
        />
      </form>
    </header>
  );
});

Header.displayName = 'HeaderMemo';
