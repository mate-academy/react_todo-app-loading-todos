import React, { useEffect, useRef, useState } from 'react';
import './Header.scss';
import classNames from 'classnames';

type Props = {
  isAllCompleted: boolean;
  onAdd: (title: string) => void;
  onError: (errorMessage: string) => void;
  toggleComplete: (isAllCompleted: boolean) => void;
};

export const Header: React.FC<Props> = React.memo(function Header({
  isAllCompleted,
  onAdd,
  onError,
  toggleComplete,
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!event.currentTarget) {
      return;
    }

    const data = new FormData(event.currentTarget);
    const title = data.get('title');

    if (typeof title !== 'string') {
      return;
    }

    if (title.trim() === '') {
      onError('Title should not be empty');

      return;
    }

    onAdd(title);
    setQuery('');
  }

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: isAllCompleted,
        })}
        data-cy="ToggleAllButton"
        onClick={() => toggleComplete(isAllCompleted)}
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          name="title"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => setQuery(event.target.value)}
          ref={inputRef}
        />
      </form>
    </header>
  );
});
