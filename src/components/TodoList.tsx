import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [inputSelectedId, setInputSelectedId] = useState('');
  const [inputValue, setInputValue] = useState('');
  const selectedTodoField = useRef<HTMLInputElement>(null);

  const onDoubleClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    const value = event.currentTarget.textContent;
    const { id } = event.currentTarget;

    setInputValue(value || '');
    setInputSelectedId(id);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (selectedTodoField.current) {
      selectedTodoField.current.focus();
    }
  });

  return (
    <ul className="todoapp__main" data-cy="TodoList">
      {todos.map(({ id, completed, title }) => (
        <li
          data-cy="Todo"
          className={classNames('todo', { completed })}
          key={id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              defaultChecked={completed}
            />
          </label>

          {(+inputSelectedId === id) ? (
            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                ref={selectedTodoField}
                value={inputValue}
                onChange={onInputChange}
                onBlur={() => setInputSelectedId('')}
              />
            </form>
          ) : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                id={`${id}`}
                onDoubleClick={onDoubleClick}
              >
                {title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDeleteButton"
              >
                ×
              </button>
            </>
          )}

          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </li>
      ))}
    </ul>
  );
};
