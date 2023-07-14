/* eslint-disable no-lone-blocks */
/* eslint-disable no-console */
/* eslint-disable quote-props */
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  deleteTodo: (arg: number) => void;
  updateTodo: (arg: number, obj: Partial<Todo>) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo, deleteTodo, updateTodo,
}) => {
  const { id, title, completed } = todo;
  const [update, setUpdate] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const editHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.value.trim()) {
      updateTodo(id, { title: e.target.value.trim() });
      setUpdate(false);
    } else {
      deleteTodo(id);
    }
  };

  useEffect(() => {
    if (update && inputRef.current) {
      inputRef.current.focus();
    }
  }, [update]);

  return (
    <div className={cn('todo', { completed })}>
      <label
        className={cn('todo__status-label', { outline: !completed })}
      >
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => updateTodo(id, { completed: !completed })}
        />
      </label>
      {!update
        ? (
          <>
            <span
              className="todo__title"
              onDoubleClick={() => setUpdate(true)}
            >
              {title}
            </span>
            <button
              type="button"
              className="todo__remove"
              onClick={() => deleteTodo(id)}
            >
              ×
            </button>
          </>
        ) : (
          <>
            <form>
              <input
                type="text"
                className="todo__title-field"
                style={{ 'outline': 'none' }}
                placeholder="Empty todo will be deleted"
                defaultValue={title}
                onBlur={editHandler}
                ref={inputRef}
              />
            </form>

            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </>
        ) }
    </div>
  );
};

{
  <div className="todo completed">
    <label className="todo__status-label">
      <input type="checkbox" className="todo__status" checked />
    </label>

    <span className="todo__title">Completed Todo</span>

    <button type="button" className="todo__remove">
      ×
    </button>

    <div className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>;
}
