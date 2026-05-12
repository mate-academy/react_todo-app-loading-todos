import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  visibleTodos: Todo[];
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  loadingIds: number[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, patch: Partial<Todo>) => Promise<Todo> | void;
};

export const Main: React.FC<Props> = ({
  visibleTodos,
  editingId,
  setEditingId,
  loadingIds,
  onDelete,
  onUpdate,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {visibleTodos.map(t => (
      <div
        key={t.id}
        data-cy="Todo"
        className={`todo ${t.completed ? 'completed' : ''}`}
      >
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="todo__status-label" htmlFor={`todo-${t.id}-status`}>
          <input
            id={`todo-${t.id}-status`}
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={t.completed}
            onChange={() => onUpdate(t.id, { completed: !t.completed })}
          />
        </label>

        {editingId === t.id ? (
          <form
            onSubmit={e => {
              e.preventDefault();
              setEditingId(null);
            }}
          >
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              defaultValue={t.title}
              onBlur={e => {
                const value = e.currentTarget.value.trim();

                if (!value) {
                  onDelete(t.id);

                  return;
                }

                if (value !== t.title) {
                  onUpdate(t.id, { title: value });
                }

                setEditingId(null);
              }}
              onKeyDown={e => {
                if (e.key === 'Escape') {
                  setEditingId(null);
                }

                if (e.key === 'Enter') {
                  const value = (e.target as HTMLInputElement).value.trim();

                  if (!value) {
                    onDelete(t.id);
                  } else if (value !== t.title) {
                    onUpdate(t.id, { title: value });
                  }

                  setEditingId(null);
                }
              }}
              autoFocus
            />
          </form>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => setEditingId(t.id)}
            >
              {t.title}
            </span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => onDelete(t.id)}
            >
              ×
            </button>
          </>
        )}

        <div
          data-cy="TodoLoader"
          className={`modal overlay ${loadingIds.includes(t.id) ? 'is-active' : ''}`}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    ))}
  </section>
);

export default Main;
