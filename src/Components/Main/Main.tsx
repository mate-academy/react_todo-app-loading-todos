import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const Main: FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos?.map((todo) => (
        <div
          key={todo.id}
          className={cn('todo', { completed: todo.completed })}
        >
          <label className="todo__status-label">
            <input type="checkbox" className="todo__status" checked />
          </label>

          <span className="todo__title">{todo.title}</span>

          <button type="button" className="todo__remove">
            ×
          </button>

          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
