import classNames from 'classnames';
import React, { useState } from 'react';
// import { patchTodos } from '../../api/todos';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo,
  updatedTodo: (updateTodo: Todo, oldTodo: Todo) => void,
  removeTodo: (todoId: number) => void,
  isLoad: boolean,
}

export const TodoInfo: React.FC<Props> = (props) => {
  const {
    todo, updatedTodo, removeTodo, isLoad,
  } = props;
  const [editMode, setEditMode] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);

  const loadUpdateTodo = async (toChange: {}) => {
    updatedTodo({
      ...todo,
      ...toChange,
    }, todo);
  };

  const fetchUpdateTitle = async () => {
    await loadUpdateTodo({ title: todoTitle });
    setEditMode(!editMode);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={(event) => updatedTodo({
            ...todo,
            completed: event.target.checked,
          },
          todo)}
        />
      </label>
      {editMode
        ? (
          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            // defaultValue={todo.title}
            value={todoTitle}
            onBlur={() => {
              fetchUpdateTitle();
            }}
            onChange={event => setTodoTitle(event.target.value)}
          />
        )
        : (
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setEditMode(!editMode)}
          >
            {todo.title}
          </span>
        )}

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDeleteButton"
        onClick={() => removeTodo(todo.id)}
      >
        ×
      </button>
      <div
        data-cy="TodoLoader"
        // className="modal overlay"
        className={classNames('modal overlay', {
          'is-active': isLoad,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
