import React from 'react';
import { Todo } from '../types/Todo';

interface TodoModalProps {
  todo: Todo;
  handleDeleteTodo: (id: number) => void;
  handleEditTodo: (todo: Todo) => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  handleDeleteTodo,
  handleEditTodo,
}) => {
  const { completed, title } = todo;

  return (
    <div>
      <div
        data-cy="Todo"
        className={`todo ${todo.completed ? 'completed' : ''}`}
        key={todo.id}
      >
        <label className="todo__status-label" aria-label="я не знаю что тут">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked
            onDoubleClick={() =>
              handleEditTodo({
                ...todo,
                completed: !completed,
              })
            }
            defaultChecked={completed}
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          {title}
        </span>

        {/* Remove button appears only on hover */}
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => handleDeleteTodo(todo.id)}
        >
          ×
        </button>

        {/* overlay will cover the todo while it is being deleted or updated */}
        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </div>
  );
};
