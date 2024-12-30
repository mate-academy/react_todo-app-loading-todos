import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  filteredTodos: Todo[];
  setError: (message: string) => void;
  loading: number | null;
  deleteTodo: (id: number) => void;
  updateTodoCheck: (id: number) => void;
  updateTodoTitle: (event: React.FormEvent, id: number, value: string) => void;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  setError,
  loading,
  deleteTodo,
  updateTodoCheck,
  updateTodoTitle,
}) => {
  const [title, setTitle] = React.useState('');
  const [isEditingId, setIsEditingId] = React.useState<number | null>(null);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trim());
    setError('');
  };

  const handleDoubleClick = (id: number, currentTitle: string) => {
    setIsEditingId(id);
    setTitle(currentTitle);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={classNames('todo item-enter-done', {
            completed: todo.completed,
          })}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            className="todo__status-label"
            htmlFor={`todo__status-${todo.id}`}
          >
            <input
              id={`todo__status-${todo.id}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => updateTodoCheck(todo.id)}
            />
          </label>

          {isEditingId === todo.id ? (
            <form
              onSubmit={event => {
                updateTodoTitle(event, todo.id, title);
                setIsEditingId(null);
                setTitle('');
              }}
            >
              <input
                type="text"
                // className="todo__active"
                value={title}
                onBlur={event => updateTodoTitle(event, todo.id, title)}
                onChange={handleInput}
                autoFocus
              />
            </form>
          ) : (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => handleDoubleClick(todo.id, todo.title)}
            >
              {todo.title}
            </span>
          )}
          {/* Remove button appears only on hover */}
          {isEditingId !== todo.id && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => deleteTodo(todo.id)}
            >
              ×
            </button>
          )}

          {/* overlay will cover the todo while it is being deleted or updated */}

          <div
            data-cy="TodoLoader"
            className={classNames('modal overlay', {
              'is-active': loading === todo.id,
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
