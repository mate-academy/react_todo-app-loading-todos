/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../types/Todo';

interface Props {
  visibleTodos: Todo[];
  processingIds: number[];
  editedTodo: Todo | null;
  tempTitle: string;
  setTempTitle: (val: string) => void;
  handleToggle: (todo: Todo) => void;
  handleDelete: (id: number) => void;
  handleEdit: (todo: Todo) => void;
  saveTitle: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  processingIds,
  editedTodo,
  tempTitle,
  setTempTitle,
  handleToggle,
  handleDelete,
  handleEdit,
  saveTitle,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <div
          data-cy="Todo"
          className={`todo ${todo.completed ? 'completed' : ''}`}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => handleToggle(todo)}
            />
          </label>

          {editedTodo?.id === todo.id ? (
            <form
              onSubmit={e => {
                e.preventDefault();
                saveTitle(todo);
              }}
            >
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                value={tempTitle}
                onChange={e => setTempTitle(e.target.value)}
                onBlur={() => saveTitle(todo)}
                autoFocus
              />
            </form>
          ) : (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => handleEdit(todo)}
            >
              {todo.title}
            </span>
          )}

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(todo.id)}
          >
            ×
          </button>

          <div
            data-cy="TodoLoader"
            className={`modal overlay ${
              processingIds.includes(todo.id) ? 'is-active' : ''
            }`}
          >
            {/* eslint-disable-next-line max-len */}
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
