import { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { deleteTodo, toogleTodo } from '../api/todos';

type Props = {
  todo: Todo;
  handleUpdateTodo: (todoId: number, todo: Todo) => void;
  onSetErrorMessage: (str: string) => void;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  handleUpdateTodo,
  onSetErrorMessage,
}) => {
  const { title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(title);

  const removeTodo = async (todoId: number) => {
    try {
      await deleteTodo(todoId);
    } catch {
      onSetErrorMessage('Unable to delete a todo');
    }
  };

  const handleToogleClick = async (todoId: number) => {
    try {
      await toogleTodo(todoId, !completed);
    } catch {
      onSetErrorMessage('Unable to cange status a todo');
    }
  };

  const eventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTodoTitle(value);
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimTodoTitle = todoTitle.trim();

    if (trimTodoTitle === todo.title) {
      setIsEditing(false);
      setTodoTitle(title);

      return;
    }

    if (!trimTodoTitle) {
      deleteTodo(todo.id);

      return;
    }

    handleUpdateTodo(todo.id, {
      ...todo,
      title: todoTitle,
    });

    setIsEditing(false);
  };

  const onCancelEditing = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.code === 'Escape') {
      setIsEditing(false);
      setTodoTitle(todo.title);
    }
  };

  return (
    <li
      className={classNames(
        'todo',
        { completed },
      )}
      onDoubleClick={() => setIsEditing(true)}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          onClick={() => {
            handleToogleClick(todo.id);
          }}
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={handleOnSubmit}
        >
          <input
            type="text"
            value={todoTitle}
            placeholder="Empty todo will be deleted"
            className="todo__title-field"
            onChange={(e) => eventChange(e)}
            onKeyUp={(e) => onCancelEditing(e)}
          />
        </form>
      ) : (
        <span className="todo__title">{todoTitle}</span>
      )}

      <button
        type="button"
        className="todo__remove"
        onClick={() => {
          removeTodo(todo.id);
        }}
      >
        ×
      </button>

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </li>
  );
};
