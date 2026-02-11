import { useState } from 'react';
import { postTodos, USER_ID } from '../api/todos';
import { Todo } from '../types/Todo';

type TodoInputProps = {
  completedTodos: Todo[];
  handleErrorMessage: (errorMessage: string) => void;
  loadingTodos: boolean;
  setLoadingTodos: (loading: boolean) => void;
  handleTodoAdded: (todo: Todo) => void;
};

export function TodoInput({
  completedTodos,
  handleErrorMessage,
  loadingTodos,
  setLoadingTodos,
  handleTodoAdded,
}: TodoInputProps) {
  const [query, setQuery] = useState<string>('');

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loadingTodos) {
      return;
    }

    if (!query) {
      handleErrorMessage('Title should not be empty');

      return;
    }

    if (query) {
      setLoadingTodos(true);

      const newTodo = {
        userId: USER_ID,
        title: query,
        completed: false,
      };

      try {
        const todo = await postTodos(newTodo);

        handleTodoAdded(todo);
        setQuery('');
      } catch (error) {
        handleErrorMessage('Unable to add a todo');
      } finally {
        setLoadingTodos(false);
      }
    }
  };

  const handleFormChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {completedTodos.length > 0 && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleFormSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          autoFocus
          onChange={event => handleFormChanges(event)}
        />
      </form>
    </header>
  );
}
