import React, { useState } from 'react';
import classNames from 'classnames';
import { ITodo } from '../../types/Todo';
import { useSetTodoContext, useTodoContext } from '../TodoContextProvider';

type Props = {
  todo: ITodo
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newTitle: string) => void;
  toggleTodoStatus: (id: number) => void;
};

export const Todo: React.FC<Props> = (
  {
    todo: { id, title, completed },
    deleteTodo,
    editTodo,
    toggleTodoStatus,
  },
) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState(title);

  const { loading } = useTodoContext();
  const { setLoading } = useSetTodoContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsEditing(false);
    setLoading(true);

    editTodo(
      id,
      newTitle,
    );

    setLoading(false);
  };

  return (
    <div className={
      classNames('todo', {
        completed,
      })
    }
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          onChange={() => toggleTodoStatus(id)}
          checked={completed}
        />
      </label>

      {!isEditing ? (
        <>
          <span
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            onClick={() => deleteTodo(id)}
          >
            ×

          </button>

        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </form>

      )}

      {loading && (
        <div className={
          classNames('modal overlay', {
            'is-active': loading,
          })
        }
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}

    </div>

  );
};
