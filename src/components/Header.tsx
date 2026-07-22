import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

type Props = {
  isAllCompleted: boolean;
  hasTodos: boolean;
  onAddTodo: (title: string) => Promise<void>;
  onToggleAll: () => void;
  isSubmitting: boolean;
  onError: (msg: string) => void;
};

export const Header: React.FC<Props> = ({
  isAllCompleted,
  hasTodos,
  onAddTodo,
  onToggleAll,
  isSubmitting,
  onError,
}) => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSubmitting) {
      inputRef.current?.focus();
    }
  }, [isSubmitting]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      onError('Title should not be empty');

      return;
    }

    onAddTodo(trimmedTitle).then(() => {
      setTitle('');
    });
  };

  return (
    <header className="todoapp__header">
      {hasTodos && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={onToggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={isSubmitting}
        />
      </form>
    </header>
  );
};
