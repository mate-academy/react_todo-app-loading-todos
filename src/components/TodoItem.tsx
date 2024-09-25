// import React, { useState } from 'react';
// import { Todo } from '../types/Todo';

// interface Props {
//   todo: Todo;
//   onDelete: (id: number) => void;
//   onToggle: (todo: Todo) => void;
// }

// export const TodoItem: React.FC<Props> = ({ todo, onDelete, onToggle }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [newTitle, setNewTitle] = useState(todo.title);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     if (newTitle.trim() && newTitle !== todo.title) {
//       // Assuming there's an onEdit prop in your TodoItem interface
//       // onEdit(todo, newTitle);
//     }
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//       handleSave();
//     }
//     if (event.key === 'Escape') {
//       setIsEditing(false);
//       setNewTitle(todo.title);
//     }
//   };

//   return (
//     <div className={`todo ${todo.completed ? 'completed' : ''}`}>
//       <label className="todo__status-label">
//         <input
//           data-cy="TodoStatus"
//           type="checkbox"
//           className="todo__status"
//           checked={todo.completed}
//           onChange={() => onToggle(todo)}
//         />
//       </label>

//       {isEditing ? (
//         <input
//           data-cy="TodoTitleField"
//           type="text"
//           className="todo__title-field"
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//           onBlur={handleSave}
//           onKeyDown={handleKeyDown}
//           autoFocus
//         />
//       ) : (
//         <span
//           data-cy="TodoTitle"
//           className="todo__title"
//           onDoubleClick={handleEdit}
//         >
//           {todo.title}
//         </span>
//       )}

//       {/* Remove button appears only on hover */}
//       <button
//         type="button"
//         className="todo__remove"
//         data-cy="TodoDelete"
//         onClick={() => onDelete(todo.id)}
//       >
//         ×
//       </button>
//     </div>
//   );
// };

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */


import { Todo } from '../types/Todo';
import React, { useState } from 'react';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onUpdate: (data: Partial<Todo>) => void;
  loading: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onUpdate,
  loading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    onUpdate({ title });
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave();
    }

    if (event.key === 'Escape') {
      setIsEditing(false);
      setTitle(todo.title);
    }
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => onUpdate({ completed: !todo.completed })}
        />
      </label>

      <form>
        {isEditing ? (
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            value={title}
            onChange={event => setTitle(event.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleEdit}
          >
            {todo.title}
          </span>
        )}
      </form>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => onDelete(todo.id)}
      >
        ×
      </button>
      {loading && (
        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}
    </div>
  );
};
