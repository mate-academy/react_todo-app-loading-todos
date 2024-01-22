import {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { deleteTodo, updateTodo } from '../../api/todos';
import { DispatchContext, StateContext } from '../../State/State';

type Props = {
  todo: Todo;
};
export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed, id } = todo;
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useContext(DispatchContext);
  const { clearAll } = useContext(StateContext);

  useEffect(() => {
    if (clearAll && completed) {
      setIsLoading(true);
    }
  }, [clearAll, completed]);

  function handleIsChecked(event: ChangeEvent<HTMLInputElement>) {
    setIsLoading(true);
    const updatedTodo = {
      completed: event.target.checked,
      id,
    };

    updateTodo(updatedTodo)
      .then(() => dispatch({ type: 'updatedAt' }))
      .catch(() => dispatch(
        { type: 'setError', payload: 'Unable to update a todo' },
      ))
      .finally(() => setIsLoading(false));
  }

  function handleDelete() {
    setIsLoading(true);
    deleteTodo(`/todos/${id}`)
      .then(() => dispatch({ type: 'updatedAt' }))
      .catch(() => dispatch(
        { type: 'setError', payload: 'Unable to delete a todo' },
      ))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <div
        data-cy="Todo"
        className={cn('todo', {
          completed,
        })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            onChange={handleIsChecked}
            checked={completed}
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          {title}
        </span>

        {/* Remove button appears only on hover */}
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={handleDelete}
        >
          ×
        </button>

        {/* overlay will cover the todo while it is being updated */}
        <div
          data-cy="TodoLoader"
          className={cn('modal overlay', {
            'is-active': isLoading,
          })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>

      {false && (
        <>
          {/* This todo is being edited */}
          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            {/* This form is shown instead of the title and remove button */}
            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </>
      )}
    </>
  );
};
