import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <li className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label>
        <input
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          readOnly
        />
        <span className="todo__title">{todo.title}</span>
      </label>
    </li>
  );
};
