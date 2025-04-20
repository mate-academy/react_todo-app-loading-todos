import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;
  const [todoClass, setTodoClass] = useState('todo');

  useEffect(() => {
    if (completed) {
      setTodoClass('todo completed');
    }
  }, [completed]);

  const completeTodo = () => {
    if (todoClass === 'todo completed') {
      setTodoClass('todo');
    } else {
      setTodoClass('todo completed');
    }
  };

  return (
    <div data-cy="Todo" className={todoClass}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onClick={completeTodo}
          checked={todoClass === 'todo completed'}
        />
        {''}
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
