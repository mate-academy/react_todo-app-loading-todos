import { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { TodoLoader } from './TodoLoader';

type TodoProps = {
  todo: Todo;
  deleteTodo: (num: number) => void;
  updateTodo: (todo: Todo) => void;
};

export const SingleTodo: React.FunctionComponent<TodoProps> = ({
  todo,
  deleteTodo,
  updateTodo,
}) => {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const inputFocusRef = useRef<HTMLInputElement>(null);

  const handleUpdateFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedTodo = { ...todo, title: editedTitle };

    if (!updatedTodo.title.trim()) {
      deleteTodo(todo.id);

      return;
    }

    updateTodo(updatedTodo);
    setEditing(false);
  };

  const handleToggleCompleted = () => {
    const updatedTodo = { ...todo, completed: !todo.completed };

    updateTodo(updatedTodo);
  };

  const handleOnBlur = () => {
    if (!editedTitle.trim()) {
      deleteTodo(todo.id);
    }

    setEditing(false);
  };

  useEffect(() => {
    if (editing && inputFocusRef.current) {
      inputFocusRef.current.focus();
    }
  }, [editing]);

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      {/*eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
      <label className="todo__status-label" htmlFor={`${todo.id}`}>
        <input
          id={`${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleToggleCompleted}
        />
      </label>
      {editing ? (
        <form onSubmit={handleUpdateFormSubmit}>
          <input
            ref={inputFocusRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
            onBlur={handleOnBlur}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setEditing(true)}
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

      <TodoLoader todo={todo} />
    </div>
  );
};

// {/* This todo is an active todo */}
// {/* <div data-cy="Todo" className={cn('todo completed', {})}>
//   <label className="todo__status-label">
//     <input
//       data-cy="TodoStatus"
//       type="checkbox"
//       className="todo__status"
//     />
//   </label>

//   <span data-cy="TodoTitle" className="todo__title">
//     Not Completed Todo
//   </span>
//   <button type="button" className="todo__remove" data-cy="TodoDelete">
//     ×
//   </button>

//   <div data-cy="TodoLoader" className="modal overlay">
//     <div className="modal-background has-background-white-ter" />
//     <div className="loader" />
//   </div>
// </div> */}

// {/* This todo is being edited */}
// {/* <div data-cy="Todo" className="todo">
//   <label className="todo__status-label">
//     <input
//       data-cy="TodoStatus"
//       type="checkbox"
//       className="todo__status"
//     />
//   </label>

//   {/* This form is shown instead of the title and remove button */}
// {/* <form>
//     <input
//       data-cy="TodoTitleField"
//       type="text"
//       className="todo__title-field"
//       placeholder="Empty todo will be deleted"
//       // value="Todo is being edited now"
//     />
//   </form> */}

// {/* <div data-cy="TodoLoader" className="modal overlay">
//     <div className="modal-background has-background-white-ter" />
//     <div className="loader" />
//   </div>
// </div>/*} */}

// {/* // This todo is in loadind state */}
// {/* <div data-cy="Todo" className="todo">
//   <label className="todo__status-label">
//     <input
//       data-cy="TodoStatus"
//       type="checkbox"
//       className="todo__status"
//     />
//   </label>

//   <span data-cy="TodoTitle" className="todo__title">
//     Todo is being saved now
//   </span>

//   <button type="button" className="todo__remove" data-cy="TodoDelete">
//     ×
//   </button>

//   {/* 'is-active' class puts this modal on top of the todo */}
// {/* <div data-cy="TodoLoader" className="modal overlay is-active">
//     <div className="modal-background has-background-white-ter" />
//     <div className="loader" />
//   </div>
// </div> */}
