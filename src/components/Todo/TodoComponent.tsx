import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  todo: Todo;
  handleUpdateCompleted: (data: Todo, bool?: boolean) => Todo;
  loading: boolean;
  selectedTodo: Todo | null;
  handleEdit: (data: Todo) => void;
  deleteTodo: (todoId: number) => Promise<void>;
  handleUpdateTitle: (data: Todo) => void;
  onNewTodoTitle: (key: string) => void;
  newTodoTitle: string;
  // editTitle: string;
  // onEditTitle: (key: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const TodoComponent: React.FC<Props> = React.memo(
  ({
    todo,
    handleUpdateCompleted,
    handleUpdateTitle,
    loading,
    selectedTodo,
    handleEdit,
    deleteTodo,
    newTodoTitle,
    onNewTodoTitle,
    // editTitle,
    // onEditTitle,
    inputRef,
  }) => {
    return (
      <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
        <label className="todo__status-label" aria-label="Toggle todo status">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onClick={() => handleUpdateCompleted(todo)}
            disabled={loading}
          />
        </label>

        {!(selectedTodo && selectedTodo.id === todo.id) ? (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => handleEdit(todo)}
            >
              {todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => deleteTodo(todo.id)}
            >
              ×
            </button>
          </>
        ) : (
          <form onSubmit={() => handleUpdateTitle(todo)}>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={newTodoTitle}
              onChange={e => onNewTodoTitle(e.target.value)}
              onBlur={() => handleUpdateTitle(todo)}
              ref={inputRef}
            />
          </form>
        )}

        <div
          data-cy="TodoLoader"
          className={cn('modal overlay', { 'is-active': loading })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    );
  },
);

TodoComponent.displayName = 'TodoComponent';
