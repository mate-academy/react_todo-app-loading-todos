import { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [edited] = useState(false);
  const [changeTodo, setChangeTodo] = useState('Todo is being edited now');

  return (
    <div
      className={classNames(
        'todo',
        {
          completed: todo.completed,
        },
      )}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => {}}
        />
      </label>

      {edited ? (
        <form>
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={changeTodo}
            onChange={event => setChangeTodo(event.target.value)}
          />
        </form>
      ) : (
        <>
          <span className="todo__title">{todo.title}</span>
          <button type="button" className="todo__remove">×</button>
        </>
      )}

      <div className={classNames(
        'modal overlay',
        { 'is-active': false },
      )}
      >
        <div
          className="modal-background has-background-white-ter"
        />
        <div className="loader" />
      </div>
    </div>
  );
};
