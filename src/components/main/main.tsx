import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  saveTodo: (
    id: number,
    currentTitle: string,
    currentCompleted: boolean,
  ) => void;
  handleComplete: (todo: Todo) => void;
  handleKeyUp: (event: React.KeyboardEvent, todo: Todo) => void;
  handleDelete: (todo: Todo) => void;
  setEdittingTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  visibleTodos: Todo[];
  edittingTitle: string;
  editingId: number | null;
  loadingIds: number[];
}

export const TodoMain: React.FC<Props> = ({
  saveTodo,
  handleComplete,
  handleKeyUp,
  handleDelete,
  setEditingId,
  setEdittingTitle,
  visibleTodos,
  editingId,
  edittingTitle,
  loadingIds,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => {
        const isEditing = editingId === todo.id;

        return (
          <div
            data-cy="Todo"
            className={classNames('todo', { completed: todo.completed })}
            key={todo.id}
          >
            <label className="todo__status-label">
              <input
                aria-label="Toggle todo status"
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onChange={() => handleComplete(todo)}
              />
            </label>

            {isEditing ? (
              <form
                onSubmit={event => {
                  event.preventDefault();
                  saveTodo(todo.id, todo.title, todo.completed);
                }}
              >
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={edittingTitle}
                  autoFocus
                  onChange={event => setEdittingTitle(event.target.value)}
                  onBlur={() => saveTodo(todo.id, todo.title, todo.completed)}
                  onKeyUp={event => handleKeyUp(event, todo)}
                />
              </form>
            ) : (
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => {
                  setEditingId(todo.id);
                  setEdittingTitle(todo.title);
                }}
              >
                {todo.title}
              </span>
            )}

            {!isEditing && (
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => handleDelete(todo)}
              >
                ×
              </button>
            )}
            <div
              data-cy="TodoLoader"
              className={classNames('modal overlay', {
                'is-active': loadingIds.includes(todo.id),
              })}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
};
