/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState } from 'react';
import { Todo } from '../types/Todo';
// import { Completed } from '../types/Completed';

type Prop = {
  todo: Todo;
  // completed: Completed[];
  // setCompleted: (completed: Completed[]) => void;
};

export const TodoItem: React.FC<Prop> = ({ todo }) => {
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const handleComplete = () => {
    setIsCompleted(!isCompleted);

    //   if (completed.some(completedTodo => completedTodo.id === todo.id)) {
    //     setCompleted(
    //       completed.filter(completedTodo => completedTodo.id !== todo.id),
    //     );
    //   } else {
    //     setCompleted([...completed, { id: todo.id }]);
    //   }
  };

  return (
    <div data-cy="Todo" className={`todo ${isCompleted && 'completed'}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onClick={handleComplete}
          // onDoubleClick={}
          checked={isCompleted}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

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
