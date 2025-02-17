import classNames from 'classnames';
import { TodosContext } from '../../Context/TodoContext';
import { useContext } from 'react';
import { TodoEdit } from '../TodoEdit';
import { EditContext } from '../../Context/EditContext';
import { ACTIONS } from '../../types/Actions';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoElement: React.FC<Props> = ({ todo }) => {
  const { completed, title, id } = todo;
  const { dispatch } = useContext(TodosContext);
  const { editedTodoId, setEditedTodoId } = useContext(EditContext);

  const handleToggle = () => {
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id, completed } });
  };

  const handleDelete = () => {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: { id } });
  };

  const completedTodoClass = classNames('todo', {
    completed: completed,
  });

  return (
    <div data-cy="Todo" className={completedTodoClass}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label" htmlFor={`completed-${id}`}>
        <input
          id={`completed-${id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleToggle}
        />
      </label>

      {editedTodoId === id ? (
        <TodoEdit title={title} id={id} />
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setEditedTodoId(id)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      )}
      <div
        data-cy="TodoLoader"
        className={`modal overlay ${editedTodoId === id ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
