/* eslint-disable jsx-a11y/label-has-associated-control */
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { useState } from 'react';

interface TodoListProps {
  lodingId: Todo['id'] | null;
  todos: Todo[];
  onChange: (todo: Todo, fieldsToUpdate: Partial<Todo>) => Promise<unknown>;
  onDelete: (todoId: Todo) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  lodingId,
  todos,
  onChange,
  onDelete,
}) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleTitleClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    todo: Todo,
  ) => {
    if (event.detail === 2) {
      setEditId(todo.id);
      setEditValue(todo.title);
    }
  };

  const handleSubmit = (todo: Todo) => {
    onChange(todo, { title: editValue })
      .then(() => setEditId(null))
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  const handleEditSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    todo: Todo,
  ) => {
    event.preventDefault();
    handleSubmit(todo);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed === true })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed === true}
              onChange={() => onChange(todo, { completed: !todo.completed })}
            />
          </label>
          {todo.id === editId ? (
            <form
              onSubmit={event => {
                handleEditSubmit(event, todo);
              }}
            >
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={editValue}
                autoFocus
                onChange={event => setEditValue(event.target.value)}
                onBlur={() => handleSubmit(todo)}
                onKeyUp={event => {
                  if (event.key === 'Escape') {
                    setEditId(null);
                  }
                }}
              />
            </form>
          ) : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onClick={event => handleTitleClick(event, todo)}
              >
                {todo.title}
              </span>
              {/* Remove button appears only on hover */}
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => onDelete(todo)}
              >
                ×
              </button>
            </>
          )}
          {/* overlay will cover the todo while it is being deleted or updated */}
          <div
            data-cy="TodoLoader"
            className={cn('modal', 'overlay', {
              'is-active': lodingId === todo.id,
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
