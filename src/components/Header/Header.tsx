import React, { useState } from 'react';
import cn from 'classnames';

type Props = {
  areAllTodosCompleted?: boolean;
  onAddTodo?: (title: string) => void;
};

export const Header: React.FC<Props> = ({ areAllTodosCompleted = false }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', { active: areAllTodosCompleted })}
        data-cy="ToggleAllButton"
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={handleInputChange}
          autoFocus
        />
      </form>
    </header>
  );
};
