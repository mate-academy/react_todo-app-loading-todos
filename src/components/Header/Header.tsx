import { useEffect, useRef } from 'react';
import cn from 'classnames';

interface Props {
  title: string;
  handleSubmit: () => void;
  handleTitleChange: (title: string) => void;
  notCompletedTodosCount: number;
  isSubmitting: boolean;
}

export const Header = ({
  title,
  handleSubmit,
  handleTitleChange,
  notCompletedTodosCount,
  isSubmitting,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}

      <button
        type="button"
        disabled={isSubmitting}
        className={cn('todoapp__toggle-all', {
          active: notCompletedTodosCount === 0,
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          value={title}
          onChange={event => handleTitleChange(event.target.value)}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
