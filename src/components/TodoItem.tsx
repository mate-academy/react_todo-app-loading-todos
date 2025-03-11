import React from 'react';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  handleDeleteTodo: (todoId: number) => void;
  handleToggleTodo: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  handleDeleteTodo,
  handleToggleTodo,
}) => {
  const todoId = `todo-${todo.id}`;

  return (
    <div className={`todo ${todo.completed ? 'completed' : ''}`} data-cy="Todo">
      <label className="todo__status-label" htmlFor={todoId}>
        {' '}
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          id={todoId}
          checked={todo.completed}
          onChange={() => handleToggleTodo(todo)}
          disabled={todo.isLoading}
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
        disabled={todo.isLoading}
      >
        ×
      </button>

      <div
        data-cy="TodoLoader"
        className={`modal overlay ${todo.isLoading ? 'is-active' : ''}`}
        style={{ display: todo.isLoading ? 'block' : 'none' }}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

export default TodoItem;
