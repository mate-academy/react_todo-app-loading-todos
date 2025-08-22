/* eslint-disable jsx-a11y/label-has-associated-control */
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import TodoLoader from './TodoLoader';
import { useState } from 'react';

type TodoItemProps = {
  todo: Todo;
};
function TodoItem({ todo }: TodoItemProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      <TodoLoader isLoading={isLoading} />
    </div>
  );
}

export default TodoItem;
