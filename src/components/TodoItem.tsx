/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

interface TodoItemProps {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, setTodos }) => {
  const handleToggle = () => {
    setTodos(prevTodos =>
      prevTodos.map(t =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t,
      ),
    );
  };

  const handleDelete = () => {
    setTodos(prevTodos => prevTodos.filter(t => t.id !== todo.id));
  };

  return (
    <div
      className={classNames('todo', { completed: todo.completed })}
      data-cy="Todo"
    >
      <label className="todo__status-label" htmlFor={`todo-status-${todo.id}`}>
        <input
          id={`todo-status-${todo.id}`}
          data-cy="TodoStatus"
          className="todo__status"
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />
      </label>
      <span className="todo__title" data-cy="TodoTitle">
        {todo.title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleDelete}
      >
        ×
      </button>
    </div>
  );
};

export default TodoItem;
