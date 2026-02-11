import classNames from 'classnames';
import { useRef, useState } from 'react';
import { postTodos } from '../api/todos';
import { Todo } from '../types/Todo';

type Props = {
  totalTodos: number;
  completedCount: number;
  handleErrorMessage: (errorMessage: string) => void;
  loadingTodos: boolean;
  setLoadingTodos: (loading: boolean) => void;
  handleTodoAdded: (todo: Todo) => void;
};

export function TodoInput({
  totalTodos,
  completedCount,
  handleErrorMessage,
  loadingTodos,
  setLoadingTodos,
  handleTodoAdded,
}: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loadingTodos) {
      return;
    }

    const title = query.trim();

    if (!title) {
      handleErrorMessage('Title should not be empty');
      inputRef.current?.focus();

      return;
    }

    handleErrorMessage('');
    setLoadingTodos(true);

    try {
      const todo = await postTodos({
        title,
        completed: false,
      });

      handleTodoAdded(todo);
      setQuery('');
    } catch {
      handleErrorMessage('Unable to add a todo');
      inputRef.current?.focus();
    } finally {
      setLoadingTodos(false);
    }
  };

  const allCompleted = totalTodos > 0 && completedCount === totalTodos;

  return (
    <header className="todoapp__header">
      {totalTodos > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          disabled={loadingTodos}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          disabled={loadingTodos}
          autoFocus
          onChange={e => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
}
