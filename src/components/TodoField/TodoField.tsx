/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectedTodoId: null | number;
  deleteTodo: (id: number) => void;
  changeCompleted: (id: number) => void;
  setSelectedTodoId: (id: number | null) => void;
  changeTodo: (id: number, newTitle: string) => void;
};

export const TodoField: React.FC<Props> = ({
  todo,
  changeCompleted,
  deleteTodo,
  selectedTodoId,
  setSelectedTodoId,
  changeTodo,
}) => {
  // console.log('render Todo ' + todo.id);

  const [todoTitle, setTodoTitle] = useState('');

  const handleEditTodo = (newTitle: string) => {
    if (!newTitle.trim()) {
      deleteTodo(todo.id);
      setSelectedTodoId(null);

      return;
    }

    changeTodo(todo.id, newTitle.trim());
    setSelectedTodoId(null);
  };

  const handleSelectTodo = () => {
    setSelectedTodoId(todo.id);
    setTodoTitle(todo.title);
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => changeCompleted(todo.id)}
        />
      </label>

      {todo.id === selectedTodoId ? (
        <form onSubmit={() => handleEditTodo(todoTitle)}>
          <input
            autoFocus
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={todoTitle}
            onChange={event => setTodoTitle(event.target.value)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => handleSelectTodo()}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
      {/* overlay will cover the todo while it is being deleted or updated */}
      {/* 'is-active' class puts this modal on top of the todo */}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
