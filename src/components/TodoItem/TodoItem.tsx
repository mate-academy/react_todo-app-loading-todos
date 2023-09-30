import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { deleteTodo } from '../../api/todos';

interface Props {
  todo: Todo,
  setTodos: (value: React.SetStateAction<Todo[]>) => void
}

export const TodoItem: React.FC<Props> = ({
  todo,
  setTodos = () => {},
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<Todo>({ ...todo });
  const [newTitle, setNewTitle] = useState<string>(todo.title);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { title } = todo;

  const handleDoubleClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.preventDefault();

    setEditing(true);
  };

  useEffect(() => {
    if (inputRef.current && editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleEditTodo = (
    changedTodo: Todo,
  ) => {
    setTodos((prevTodos: Todo[]) => {
      const newTodos = [...prevTodos];
      const index = prevTodos.findIndex(findTodo => findTodo.id === todo.id);

      newTodos.splice(index, 1, changedTodo);

      return newTodos;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNewTodo({
      ...todo,
      title: newTitle,
    });

    handleEditTodo(newTodo);
  };

  const deleteCurrentTodo = (currentTodo: Todo) => {
    deleteTodo(currentTodo.id);

    setTodos(currentTodos => {
      const newTodos = [...currentTodos];
      const index = currentTodos
        .findIndex(findTodo => findTodo.id === currentTodo.id);

      newTodos.splice(index, 1);

      return newTodos;
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const changeChecked = () => {
    setNewTodo({
      ...todo,
      completed: !todo.completed,
    });

    handleEditTodo(newTodo);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames({
        todo: !todo.completed,
        'todo completed': todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={changeChecked}
        />
      </label>
      {
        !editing
          ? (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={handleDoubleClick}
              >
                {title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => deleteCurrentTodo(todo)}
              >
                ×
              </button>
            </>

          ) : (
            <form onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={newTitle}
                onChange={handleChange}
                onBlur={() => setEditing(false)}
              />
            </form>
          )
      }

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

// {/* This is a completed todo */}
// <div data-cy="Todo" className="todo completed">
// <label className="todo__status-label">
//   <input
//     data-cy="TodoStatus"
//     type="checkbox"
//     className="todo__status"
//     checked
//   />
// </label>

// <span data-cy="TodoTitle" className="todo__title">
//   Completed Todo
// </span>

// {/* Remove button appears only on hover */}
// <button type="button" className="todo__remove" data-cy="TodoDelete">
//   ×
// </button>

// {/* overlay will cover the todo while it is being updated */}
// <div data-cy="TodoLoader" className="modal overlay">
//   <div className="modal-background has-background-white-ter" />
//   <div className="loader" />
// </div>
// </div>

// {/* This todo is not completed */}
// <div data-cy="Todo" className="todo">
// <label className="todo__status-label">
//   <input
//     data-cy="TodoStatus"
//     type="checkbox"
//     className="todo__status"
//   />
// </label>

// <span data-cy="TodoTitle" className="todo__title">
//   Not Completed Todo
// </span>
// <button type="button" className="todo__remove" data-cy="TodoDelete">
//   ×
// </button>

// <div data-cy="TodoLoader" className="modal overlay">
//   <div className="modal-background has-background-white-ter" />
//   <div className="loader" />
// </div>
// </div>

// {/* This todo is being edited */}
// <div data-cy="Todo" className="todo">
// <label className="todo__status-label">
//   <input
//     data-cy="TodoStatus"
//     type="checkbox"
//     className="todo__status"
//   />
// </label>

// {/* This form is shown instead of the title and remove button */}
// <form>
//   <input
//     data-cy="TodoTitleField"
//     type="text"
//     className="todo__title-field"
//     placeholder="Empty todo will be deleted"
//     value="Todo is being edited now"
//   />
// </form>

// <div data-cy="TodoLoader" className="modal overlay">
//   <div className="modal-background has-background-white-ter" />
//   <div className="loader" />
// </div>
// </div>

// {/* This todo is in loadind state */}
// <div data-cy="Todo" className="todo">
// <label className="todo__status-label">
//   <input
//     data-cy="TodoStatus"
//     type="checkbox"
//     className="todo__status"
//   />
// </label>

// <span data-cy="TodoTitle" className="todo__title">
//   Todo is being saved now
// </span>

// <button type="button" className="todo__remove" data-cy="TodoDelete">
//   ×
// </button>

// {/* 'is-active' class puts this modal on top of the todo */}
// <div data-cy="TodoLoader" className="modal overlay is-active">
//   <div className="modal-background has-background-white-ter" />
//   <div className="loader" />
// </div>
// </div>
