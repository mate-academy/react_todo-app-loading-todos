import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { ErrorsEnum } from '../types/Error.enum';

interface Props {
  onError: (error: ErrorsEnum) => void;
}

export const Header: FC<Props> = ({ onError }) => {
  const todoFieldRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (todoFieldRef.current) {
      todoFieldRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query) {
      onError(ErrorsEnum.EmptyTitle);

      return;
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={todoFieldRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
