import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type TodoProps = {
  todo: Todo;
};

const TodoItem: React.FC<TodoProps> = ({ todo }) => {
  const { id, title, completed } = todo;

  const [todoState, setTodoState] = useState({
    isEdited: false,
    editedValue: title,
    completed: completed,
  });

  useEffect(() => {
    const cleanInputFocus = (event: MouseEvent) => {
      const element = event.target as HTMLElement;

      if (element.dataset.cy !== 'TodoTitleField') {
        setTodoState({ ...todoState, isEdited: false });
      }
    };

    document.addEventListener('click', cleanInputFocus);

    return () => {
      document.removeEventListener('click', cleanInputFocus);
    };
  }, [todoState]);

  return (
    <div
      key={id}
      data-cy="Todo"
      className={`todo ${todoState.completed ? 'completed' : ''}`}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todoState.completed}
          onClick={() =>
            setTodoState({ ...todoState, completed: !todoState.completed })
          }
        />
      </label>

      {todoState.isEdited ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={todoState.editedValue}
            onChange={e =>
              setTodoState({ ...todoState, editedValue: e.target.value })
            }
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setTodoState({ ...todoState, isEdited: true })}
        >
          {todoState.editedValue}
        </span>
      )}

      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

export default TodoItem;
