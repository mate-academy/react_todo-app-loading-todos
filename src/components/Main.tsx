import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { Errors } from '../types/Erorrs';

type Props = {
  filteringList: Todo[] | null
  setTypeError: (typeError: Errors) => void
  setNotificationError: (notificationError: boolean) => void
};

export const Main: React.FC<Props> = ({
  filteringList,
  setTypeError,
  setNotificationError,
}) => {
  return (
    <section className="todoapp__main">
      {filteringList?.map(todo => (
        <div
          key={todo.id}
          className={classNames(
            'todo',
            { completed: todo.completed },
          )}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span className="todo__title">
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            onClick={() => {
              setTypeError(Errors.REMOVE);
              setNotificationError(true);
            }}
          >
            ×
          </button>

          <div className="modal overlay">
            <div className="
              modal-background
              has-background-white-ter"
            />
            <div className="loader" />
          </div>
        </div>
      ))}

    </section>
  );
};
