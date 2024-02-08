import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { DispatchContext } from '../management/TodoContext';
import { Loader } from './Loader';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const { id, title, completed } = todo;

  const [isEdited, setIsEdited] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEdited && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isEdited]);

  const hendleStatus = () => {
    dispatch({
      type: 'markStatus',
      payload: id,
    });
  };

  const hendleDeleteTodo = () => {
    dispatch({
      type: 'deleteTodo',
      payload: id,
    });
  };

  const hendleSaveEditTodo = () => {
    if (editedTitle.trim()) {
      dispatch({
        type: 'editTitle',
        id,
        newTitle: editedTitle,
      });
      setIsEdited(false);
    } else {
      hendleDeleteTodo();
    }
  };

  const editFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    hendleSaveEditTodo();
  };

  const hendleCancelEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setEditedTitle(title);
      setIsEdited(false);
    }
  };

  return (
    <>
      <div
        data-cy="Todo"
        className={classNames('todo', {
          completed: completed === true,
        })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={completed}
            onChange={hendleStatus}
          />
        </label>

        {!isEdited ? (
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEdited(true)}
          >
            {title}
          </span>
        ) : (
          <form onSubmit={editFormSubmit}>
            <input
              data-cy="TodoTitleField"
              type="text"
              ref={titleRef}
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={hendleSaveEditTodo}
              onKeyUp={hendleCancelEdit}
            />
          </form>
        )}

        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={hendleDeleteTodo}
        >
          ×
        </button>

        <Loader />
      </div>
    </>
  );
};
