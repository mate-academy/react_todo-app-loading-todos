import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { Loader } from './Loader';

type Props = {
  todo: Todo;
  deletingTodoIds: number[];
  onDelete: (todoId: number) => Promise<boolean>;
  onUpdate: (todoId: number,
    updateData: Partial<Pick<Todo, 'title' | 'completed'>>,) => Promise<void>;
  updatingTodoIds: number[];
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deletingTodoIds,
  onDelete,
  onUpdate,
  updatingTodoIds,
}) => {
  const [todoTitleField, setTodoTitleField] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  const titleTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleTodoField.current) {
      titleTodoField.current.focus();
    }
  }, [isEditing]);

  const cancelEditing
    = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape') {
        setTodoTitleField(todo.title);
        setIsEditing(false);
      }
    };

  const handleChangingTitle
    = (event: React.FormEvent<HTMLFormElement>
    | React.FocusEvent<HTMLInputElement, Element>) => {
      event.preventDefault();

      if (todo.title !== todoTitleField) {
        onUpdate(todo.id, { title: todoTitleField });
      }

      if (todoTitleField === '') {
        onDelete(todo.id);
      }

      setIsEditing(false);
    };

  return (
    <div
      data-cy="Todo"
      key={todo.id}
      className={cn('todo',
        { completed: todo.completed === true })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onClick={() => onUpdate(todo.id, { completed: !todo.completed })}
        />
      </label>

      {!isEditing
        ? (
          <>
            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
              onClick={() => onDelete(todo.id)}
            >
              ×
            </button>
          </>
        ) : (
          <form onSubmit={handleChangingTitle}>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={todoTitleField}
              onChange={(event) => setTodoTitleField(event.target.value)}
              onBlur={handleChangingTitle}
              onKeyDown={cancelEditing}
              ref={titleTodoField}
            />
          </form>
        )}

      <Loader
        isDelete={deletingTodoIds}
        todoId={todo.id}
        updatingTodoIds={updatingTodoIds}
      />
    </div>
  );
};
