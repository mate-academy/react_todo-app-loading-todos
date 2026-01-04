import React from 'react';
import { FilterType } from '../constants/filters';

interface TodoHeaderProps {
  allCompleted: boolean;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({ allCompleted }) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
      data-cy="ToggleAllButton"
    />
    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
