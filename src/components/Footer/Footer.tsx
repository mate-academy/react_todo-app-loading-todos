import React from 'react';

import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/FilterType';
import { Filter } from '../Filter';

type Props = {
  todoList: Todo[];
  activeFilter: string;
  setActiveFilter: (filter: FilterType) => void;
};

export const Footer: React.FC<Props> = ({
  todoList,
  activeFilter,
  setActiveFilter,
}) => {
  const getRemainingTodos = () => {
    return todoList.reduce((counter, currentTodo) => {
      return currentTodo.completed ? counter : counter + 1;
    }, 0);
  };

  const isAllTodosNotCompleted = () => {
    return todoList.every(todo => !todo.completed);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {getRemainingTodos()} items left
      </span>

      <Filter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={isAllTodosNotCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
};
