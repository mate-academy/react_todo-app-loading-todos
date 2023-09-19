import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { deleteTodo, changeTodo } from '../../api/todos';
import { ErrorMessages } from '../../types/ErrorMessages';
import { TodoLoadingItem } from '../TodoLoadingItem';

type Props = {
  todo: Todo
  handleTodoDelete: (id: number) => void;
  setErrorMessage: (message: ErrorMessages) => void;
  handleTodoUpdate: (newTodo: Todo) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  handleTodoDelete,
  setErrorMessage,
  handleTodoUpdate,
}) => {
  const { title, completed, id } = todo;
  const [isEdited, setIsEdited] = useState(false);
  const [todoTitle, setTodoTitle] = useState(title);
  const [isLoading, setIsLoading] = useState(false);

  const removeTodo = () => {
    setIsLoading(true);

    deleteTodo(id)
      .then(() => handleTodoDelete(id))
      .catch(() => setErrorMessage(ErrorMessages.CannotDelete))
      .finally(() => setIsLoading(false));
  };

  const updateTodo = (updates: any) => {
    setIsLoading(true);

    changeTodo(id, updates)
      .then((newTodo) => handleTodoUpdate(newTodo))
      .catch(() => setErrorMessage(ErrorMessages.CannotUpdate))
      .finally(() => setIsLoading(false));
  };

  const handleCompletionStatusChange = () => {
    updateTodo({ completed: !completed });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateTodo({ title: todoTitle });

    setIsEdited(false);
  };

  if (isLoading) {
    return (
      <TodoLoadingItem title={title} />
    );
  }

  return (
    <div className={classNames('todo', {
      completed,
    })}
    >
      <label className="todo__status-label">
        <input
          name="completed"
          type="checkbox"
          className="todo__status"
          onChange={handleCompletionStatusChange}
          checked={completed}
        />
      </label>
      {isEdited
        ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={todoTitle}
              onBlur={() => setIsEdited(false)}
              onChange={(event) => setTodoTitle(event.target.value)}
              // eslint-disable-next-line
              autoFocus
            />
          </form>
        )
        : (
          <span
            className="todo__title"
            onDoubleClick={() => setIsEdited(true)}
          >
            {title}
          </span>
        )}

      <button
        onClick={removeTodo}
        type="button"
        className="todo__remove"
      >
        ×

      </button>

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
