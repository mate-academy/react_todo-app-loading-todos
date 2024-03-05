/* eslint-disable no-lone-blocks */
import classNames from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from './Todos.Context';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos, removeTodo, editTodo } = useContext(TodosContext);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggleCompleted = () => {
    const updatedTodos = todos.map(item => {
      if (item.id === todo.id) {
        return { ...item, completed: !item.completed };
      }

      return item;
    });

    setTodos(updatedTodos);
  };

  const handleEditTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleRemoveTodo = () => {
    removeTodo(todo.id);
  };

  const handleSave = () => {
    if (editedTitle.trim().length === 0) {
      removeTodo(todo.id);
    }

    if (editedTitle.trim() !== '' && editedTitle !== todo.title) {
      editTodo(todo.id, editedTitle);
    } else {
      setEditedTitle(todo.title);
    }

    setIsEditing(false);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave();
    } else if (event.key === 'Escape') {
      setEditedTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed === true,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleToggleCompleted}
        />
      </label>

      {isEditing ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            value={editedTitle}
            onChange={handleEditTodo}
            onBlur={handleSave}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            onKeyDown={handleKeyDown}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {editedTitle}
          </span>

          {/* Remove button appears only on hover */}

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleRemoveTodo}
          >
            ×
          </button>
        </>
      )}

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

{
  /* This todo is an active todo */
}

// eslint-disable-next-line no-lone-blocks
{
  /* <div data-cy="Todo" className="todo">
     <label className="todo__status-label">
       <input
         data-cy="TodoStatus"
         type="checkbox"
         className="todo__status"
       />
     </label>

     <span data-cy="TodoTitle" className="todo__title">
       Not Completed Todo
     </span>
     <button type="button" className="todo__remove" data-cy="TodoDelete">
       ×
     </button>

     <div data-cy="TodoLoader" className="modal overlay">
       <div className="modal-background has-background-white-ter" />
       <div className="loader" />
     </div>
   </div> */
}

// eslint-disable-next-line no-lone-blocks
{
  /* This todo is being edited */
}

// eslint-disable-next-line no-lone-blocks
{
  /* <div data-cy="Todo" className="todo">
     <label className="todo__status-label">
       <input
         data-cy="TodoStatus"
         type="checkbox"
         className="todo__status"
       />
     </label> */
}

// eslint-disable-next-line no-lone-blocks
{
  /* This form is shown instead of the title and remove button */
}

// eslint-disable-next-line no-lone-blocks
{
  /* <form>
       <input
         data-cy="TodoTitleField"
         type="text"
         className="todo__title-field"
         placeholder="Empty todo will be deleted"
         value="Todo is being edited now"
       />
     </form>

     <div data-cy="TodoLoader" className="modal overlay">
       <div className="modal-background has-background-white-ter" />
       <div className="loader" />
     </div>
   </div> */
}

{
  {
    /* This todo is in loadind state */
  }

  // eslint-disable-next-line no-lone-blocks
  {
    /* <div data-cy="Todo" className="todo">
     <label className="todo__status-label">
       <input
         data-cy="TodoStatus"
         type="checkbox"
         className="todo__status"
       />
     </label>

     <span data-cy="TodoTitle" className="todo__title">
       Todo is being saved now
     </span> */
  }

  // eslint-disable-next-line no-lone-blocks
  {
    /*
     <button type="button" className="todo__remove" data-cy="TodoDelete">
       ×
     </button> */
  }

  // eslint-disable-next-line no-lone-blocks
  {
    /* 'is-active' class puts this modal on top of the todo */
  }

  // eslint-disable-next-line no-lone-blocks
  {
    /* <div data-cy="TodoLoader" className="modal overlay is-active">
       <div className="modal-background has-background-white-ter" />
       <div className="loader" />
     </div>
   </div> */
  }
}
