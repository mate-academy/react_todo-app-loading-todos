import React from 'react';
import { Todo } from '../types/Todo';

interface TodoSectionProps {
  todos: Todo[];
  handleEditTodo: (todo: Todo) => void;
  handleDeleteTodo: (id: number) => void;
}

export const TodoSection: React.FC<TodoSectionProps> = ({
  todos,
  handleEditTodo,
  handleDeleteTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={`todo ${todo.completed ? 'completed' : ''}`}
        >
          <label className="todo__status-label" aria-label="я не знаю что тут">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() =>
                handleEditTodo({ ...todo, completed: !todo.completed })
              }
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDeleteTodo(todo.id)}
          >
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
