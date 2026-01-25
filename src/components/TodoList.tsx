import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  if (todos.length === 0) {
    return null;
  }

  return (
    <section className="main">
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                checked={todo.completed}
                readOnly
              />
              <label>{todo.title}</label>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
