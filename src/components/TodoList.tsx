import React from 'react';
import { Todo } from '../types/Todo';

interface TodoListProps {
  todos: Todo[];
  onUpdateStatus: (id: number, completed: boolean) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onUpdateStatus }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={`todo ${todo.completed ? 'completed' : ''}`}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => onUpdateStatus(todo.id, !todo.completed)}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
