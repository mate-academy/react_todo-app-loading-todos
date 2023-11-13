import React from 'react';
import { Todo } from '../types/Todo';
import { TodosFilter } from '../types/TodosFilter';

type Props = {
  currentTodos: Todo[];
  filter: TodosFilter;
};

export const TodoList: React.FC<Props> = (
  { currentTodos, filter },
) => {
  const filteredTodos = () => {
    switch (filter) {
      case TodosFilter.all:
        return currentTodos;
      case TodosFilter.completed:
        return currentTodos.filter(todo => todo.completed);
      case TodosFilter.active:
        return currentTodos.filter(todo => !todo.completed);
      default:
        return currentTodos;
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos().map(todo => (
        <div key={todo.id} data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
            />
          </label>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>
          {/* Remove button appears only on hover */}
          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>
        </div>
      ))}
      {/* Additional components for overlays and editing */}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </section>
  );
};
