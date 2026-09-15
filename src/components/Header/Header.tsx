import React, { useState } from 'react';
import './Header.scss';
import classNames from 'classnames';

type Props = {
  isAllCompleted: boolean;
  onAdd: (title: string) => void;
  onError: (errorMessage: string) => void;
  onComplete: (isAllCompleted: boolean) => void;
};

export const Header: React.FC<Props> = React.memo(function Header({
  isAllCompleted,
  onAdd,
  onError,
  onComplete,
}) {
  const [query, setQuery] = useState('');

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
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: isAllCompleted,
        })}
        data-cy="ToggleAllButton"
        onClick={() => onComplete(isAllCompleted)}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          name="title"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
});
