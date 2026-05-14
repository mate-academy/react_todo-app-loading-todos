// .. FormAdd.tsx
import { useState } from 'react';

interface FormAddProps {
  handleAddTodo: (title: string) => void;
  allCompleted: boolean;
  hasTodos: boolean;
}

export const FormAdd = ({
  handleAddTodo,
  allCompleted,
  hasTodos,
}: FormAddProps) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    handleAddTodo(query);

    setQuery('');
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {hasTodos && (
        <button
          type="button"
          className={
            allCompleted ? 'todoapp__toggle-all active' : 'todoapp__toggle-all'
          }
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleQueryChange}
        />
      </form>
    </header>
  );
};
