import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';

type Props = {
  completed: boolean,
  title: string,
};

const Todo: React.FC<Props> = ({ completed, title }) => {
  const [isEditTodo, setEditTodo] = useState(false);
  const [value, setValue] = useState(title);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onDoubleClickHandle = () => setEditTodo(true);
  const onBlurHandle = () => setEditTodo(false);

  return (
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

      {isEditTodo
        ? (
          <form
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={value}
              onChange={onChangeValue}
              onBlur={onBlurHandle}
            />
          </form>
        ) : (
          <span
            className="todo__title"
            onDoubleClick={onDoubleClickHandle}
          >
            {value.length
              ? value
              : title}
          </span>
        )}

      <button type="button" className="todo__remove">×</button>

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </li>
  );
};

export default Todo;
