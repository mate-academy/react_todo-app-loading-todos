import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed: isCompleted } = todo;

  const isEdited = false;
  const isLoaded = false;

  return (
    <div
      className={classNames(
        'todo',
        { completed: isCompleted },
      )}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={isCompleted}
          readOnly={isCompleted}
        />
      </label>

      {!isEdited ? (
        <>
          <span className="todo__title">{title}</span>
          <button type="button" className="todo__remove">×</button>
        </>
      ) : (
        <form>
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
          />
        </form>
      )}

      <div
        className={classNames(
          'modal',
          'overlay',
          { 'is-active': isLoaded },
        )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
