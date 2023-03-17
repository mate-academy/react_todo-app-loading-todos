import { FC } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

const TodoInfo: FC<Todo> = ({ title }) => (
  <>
    <label className="todo__status-label">
      <input
        type="checkbox"
        className="todo__status"
        checked
      />
    </label>

    <span className="todo__title">{title}</span>

    <button type="button" className="todo__remove">×</button>

    {/* <form>
      <input
        type="text"
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        value="Todo is being edited now"
      />
    </form> */}

    <div
      className={classNames(
        'modal overlay',
        { 'is-active': false },
      )}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </>
);

export default TodoInfo;
