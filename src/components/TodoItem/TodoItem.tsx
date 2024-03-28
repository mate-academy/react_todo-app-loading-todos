import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type FormInputEvent =
  | React.FormEvent<HTMLFormElement>
  | React.ChangeEvent<HTMLInputElement>;

type Props = {
  todo: Todo;
  selectedTodo: Todo | null;
  onDelete?: (todoId: number) => void;
  onEdit?: (todo: Todo | null) => void;
  onSubmit: (todo: Todo) => Promise<void>;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodo,
  onDelete = () => {},
  onEdit = () => {},
  onSubmit,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleTodoTitleClick = () => {
    if (todo.id !== selectedTodo?.id) {
      onEdit(todo);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter') {
      handleTodoTitleClick();
    }
  };

  const handleTodoTitleChange = (event: FormInputEvent) => {
    event.preventDefault();
    setLoading(true);
    onSubmit({ ...todo, title: todoTitle })
      .then(() => onEdit(null))
      .finally(() => setLoading(false));
  };

  const handleTodoCompletedChange = () => {
    setLoading(true);
    onSubmit({ ...todo, completed: !todo.completed })
      .then(() => onEdit(null))
      .finally(() => setLoading(false));
  };

  return (
    <div
      key={todo.id}
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label" aria-label="todo__status">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleTodoCompletedChange()}
        />
      </label>

      {todo.id !== selectedTodo?.id ? (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onClick={handleTodoTitleClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
        >
          {todo.title}
        </span>
      ) : (
        <form onSubmit={handleTodoTitleChange}>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={todoTitle}
            onChange={event => setTodoTitle(event.target.value)}
            onBlur={handleTodoTitleChange}
            disabled={loading}
          />
        </form>
      )}

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => onDelete(todo.id)}
      >
        ×
      </button>

      <div
        data-cy="TodoLoader"
        className={`modal overlay ${loading && 'is-active'}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
