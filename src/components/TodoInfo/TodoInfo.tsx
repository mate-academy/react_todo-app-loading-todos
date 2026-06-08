import { useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoInfo: React.FC<Props> = ({ todo, setTodos }) => {
  const [isLoading, setIsLoading] = useState(false);

  function handleToggleStatus() {
    setIsLoading(true);

    setTimeout(() => {
      setTodos(prevTodos =>
        prevTodos.map(prevTodo =>
          prevTodo.id === todo.id
            ? { ...prevTodo, completed: !prevTodo.completed }
            : prevTodo,
        ),
      );
      setIsLoading(false);
    }, 500);
  }

  function handleDeleteTodo() {
    setIsLoading(true);

    setTimeout(() => {
      setTodos(prevTodos =>
        prevTodos.filter(prevTodo => prevTodo.id !== todo.id),
      );
      setIsLoading(false);
    }, 500);
  }

  return (
    <li
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor={`todo-checkbox-${todo.id}`}
        className="todo__status-label"
      >
        <input
          id={`todo-checkbox-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={handleToggleStatus}
          checked={todo.completed}
        />
      </label>
      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleDeleteTodo}
      >
        ×
      </button>
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', { 'is-active': isLoading })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </li>
  );
};
