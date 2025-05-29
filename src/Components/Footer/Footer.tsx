import React from 'react';
import { FilterTodos } from '../FilterTodos/FilterTodos';
import { Todo } from '../../types/Todo';
import { TodosFilter } from '../../types/TodosFilter';

type FooterProps = {
  todos: Todo[];
  selectedFilter: TodosFilter;
  setSelectedFilter: (filter: TodosFilter) => void;
};

export const Footer: React.FC<FooterProps> = ({
  todos,
  selectedFilter,
  setSelectedFilter,
}) => {
  const todosCounter = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosCounter} items left
      </span>

      <FilterTodos
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={true}
      >
        Clear completed
      </button>
    </footer>
  );
};
