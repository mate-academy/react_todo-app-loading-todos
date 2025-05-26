/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  savingIds: number[];
  editingId: number | null;
  editingTitle: string;
  onToggleTodo: (todo: Todo) => void;
  onRemoveTodo: (id: number) => void;
  onStartEdit: (todo: Todo) => void;
  onSaveEdit: () => void;
  setEditingTitle: (title: string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  savingIds,
  editingId,
  editingTitle,
  onToggleTodo,
  onRemoveTodo,
  onStartEdit,
  onSaveEdit,
  setEditingTitle,
}) => {
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveEdit();
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTitle(e.target.value);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        const isSaving = savingIds.includes(todo.id);
        const isEditing = editingId === todo.id;

        return (
          <div
            key={todo.id}
            data-cy="Todo"
            className={classNames('todo', { completed: todo.completed })}
            onDoubleClick={() => onStartEdit(todo)}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                disabled={isSaving}
                onChange={() => onToggleTodo(todo)}
              />
            </label>

            {!isEditing ? (
              <>
                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  disabled={isSaving}
                  onClick={() => onRemoveTodo(todo.id)}
                >
                  ×
                </button>
              </>
            ) : (
              <form onSubmit={handleEditSubmit}>
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={editingTitle}
                  onChange={handleEditChange}
                  onBlur={onSaveEdit}
                  autoFocus
                />
              </form>
            )}

            <div
              data-cy="TodoLoader"
              className={classNames('modal overlay', { 'is-active': isSaving })}
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
