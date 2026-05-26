import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  visibleTodos: Todo[];
  handleChangeComplete: (todoId: number) => void;
  editingTodoId: number | null;
  handleEditSubmit: (todoId: number) => void;
  editTitle: string;
  setEditTitle: React.Dispatch<React.SetStateAction<string>>;
  handleDobelChangeTitle: (todoId: number, title: string) => void;

  removeElement: (todoId: number) => void;
  loadingTodoId: number | null;
};

export const Main: React.FC<Props> = ({
  visibleTodos,
  handleChangeComplete,
  editingTodoId,
  handleEditSubmit,
  editTitle,
  setEditTitle,
  handleDobelChangeTitle,
  removeElement,
  loadingTodoId,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {visibleTodos.map(todo => (
        <div
          data-cy="Todo"
          className={cn('todo', {
            completed: todo.completed,
          })}
          key={todo.id}
        >
          <label className="todo__status-label" htmlFor={`todo-${todo.id}`}>
            <input
              id={`todo-${todo.id}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => handleChangeComplete(todo.id)}
              aria-label="Todo title"
            />
          </label>
          {editingTodoId === todo.id ? (
            <form
              onSubmit={event => {
                event.preventDefault();
                handleEditSubmit(todo.id);
              }}
            >
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={editTitle}
                onChange={event => setEditTitle(event.target.value)}
                autoFocus
              />
            </form>
          ) : (
            <span
              data-cy="TodoTitle"
              onDoubleClick={() => handleDobelChangeTitle(todo.id, todo.title)}
              className="todo__title"
            >
              {todo.title}
            </span>
          )}

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => removeElement(todo.id)}
          >
            ×
          </button>

          {/* overlay will cover the todo while it is being deleted or updated */}
          <div
            data-cy="TodoLoader"
            className={cn('modal overlay', {
              'is-active': loadingTodoId === todo.id,
            })}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
