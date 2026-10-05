import React from 'react';
import { Todo } from '../../types/Todo';
import { Filter, TodoFilter } from '../TodoFilter/TodoFilter';

type Props = {
  todos: Todo[];
  filter: Filter;
};

export const TodoFooter: React.FC<Props> = ({ todos, filter }) => {
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      <TodoFilter filter={filter} />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
