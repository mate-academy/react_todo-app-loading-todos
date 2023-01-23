import React, { FC, memo, useState } from 'react';

export interface Props {
  newTodoField: React.RefObject<HTMLInputElement>;
  onAddTodo: (title: string) => void,
}

export const Header: FC<Props> = memo(
  ({
    newTodoField,
    onAddTodo,
  }) => {
    const [title, setQuery] = useState('');

    const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      onAddTodo(title);
    };

    return (
      <header className="todoapp__header">
        <form
          onSubmit={handleAddTodo}
        >
          <button
            type="button"
            aria-label="toggle"
            data-cy="ToggleAllButton"
            className="todoapp__toggle-all active"
          />

          <input
            type="text"
            value={title}
            ref={newTodoField}
            data-cy="NewTodoField"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>

      </header>
    );
  },
);
