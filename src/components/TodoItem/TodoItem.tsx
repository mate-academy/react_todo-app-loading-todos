/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../contexts/TodosProvider';
import { TodoAction } from '../../types/TodoAction';
import { customDebounce } from '../../utils/useDebounce';
import { EditTodoForm } from '../EditTodoForm';

interface Props {
  todo: Todo,
}

export const TodoItem: React.FC<Props> = React.memo(
  ({ todo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { dispatch } = useContext(TodosContext);
    const { title, completed } = todo;

    const handleTodoChanged = (newTitle: string) => {
      const normalizedTitle = newTitle.trim();

      if (normalizedTitle !== title) {
        if (normalizedTitle === '') {
          dispatch({
            type: TodoAction.Delete,
            todo,
          });
        } else {
          dispatch({
            type: TodoAction.Update,
            todo: {
              ...todo,
              title: normalizedTitle,
            },
          });
        }
      }

      setIsEditing(false);
    };

    const handleTodoChangeCancelled = () => {
      setIsEditing(false);
    }

    const handleTodoStatusChanged = () => {
      dispatch({
        type: TodoAction.Update,
        todo: {
          ...todo,
          completed: !todo.completed,
        },
      });
    };

    const handleDblclick = customDebounce(() => {
      if (!isEditing) {
        setIsEditing(true);
      }
    }, 300);

    const handleDeleteButtonClicked = () => {
      dispatch({
        type: TodoAction.Delete,
        todo,
      });
    };

    return (
      <div
        data-cy="Todo"
        className={cn('todo', {
          completed,
        })}
      >
        <label className="todo__status-label">
          <input
            defaultChecked={completed}
            onChange={handleTodoStatusChanged}
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        {isEditing
          ? (
            <EditTodoForm
              onCanceled={handleTodoChangeCancelled}
              onTodoChanged={handleTodoChanged}
              initialTitle={title}
            />
          )
          : (
            <>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onClick={handleDblclick}
              >
                {todo.title}
              </span>
              <button
                onClick={handleDeleteButtonClicked}
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>
            </>
          )}

        <div
          data-cy="TodoLoader"
          className={cn('modal overlay', {
            'is-active': false,
          })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    );
  },
);
