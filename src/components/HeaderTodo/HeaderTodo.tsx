import classNames from 'classnames';
import { FC, useEffect, useRef } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
}

export const Header: FC<Props> = ({ todos }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isAllTodosActive = todos.every(todo => todo.completed);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: isAllTodosActive,
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
};
