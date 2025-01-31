import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { ErrorsType } from '../types/Error';
import cn from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  onError: (error: ErrorsType | null) => void;
  todos: Todo[];
}

export const TodoHeader: React.FC<Props> = ({ onError, todos }) => {
  const todoFieldRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (todoFieldRef.current) {
      todoFieldRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) {
      onError(ErrorsType.EmptyTitle);

      return;
    }

    setQuery('');
    onError(null);
  };

  const areAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', { active: areAllCompleted })}
        data-cy="ToggleAllButton"
        disabled={todos.length === 0}
      />

      <form onSubmit={handleSubmit}>
        <input
          ref={todoFieldRef}
          value={query}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={e => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
};
