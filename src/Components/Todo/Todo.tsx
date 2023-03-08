import classNames from 'classnames';
import React from 'react';

type Props = {
  completed: boolean,
  title: string,
};

const Todo: React.FC<Props> = ({ completed, title }) => (
  <li
    className={classNames(
      'todo',
      { completed },
    )}
  >
    <label className="todo__status-label">
      <input
        type="checkbox"
        className="todo__status"
        checked={completed}
      />
    </label>

    <span className="todo__title">{title}</span>
    <button type="button" className="todo__remove">×</button>

    {false && (
      <form>
        <input
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value="Todo is being edited now"
        />
      </form>
    )}

    <div className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </li>
);

export default Todo;
