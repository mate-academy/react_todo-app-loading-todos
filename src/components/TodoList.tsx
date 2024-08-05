import React from 'react';
import { Todo } from '../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deletePost: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleTodo,
  deletePost,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', {
            completed: todo.completed,
          })}
        >
          <label className="todo__status-label" htmlFor={`todo-status-${todo.id}`}>
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              id={`todo-status-${todo.id}`}
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deletePost(todo.id)}
          >
            ×
          </button>

          {/* overlay will cover the todo while it is being deleted or updated */}
          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
