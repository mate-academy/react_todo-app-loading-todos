import { FC } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  filteredTodos?: Todo[];
};

export const Main: FC<Props> = ({ filteredTodos }) => {
  return (
    <section className="todoapp__main">
      {filteredTodos?.map((todo) => (
        <div
          key={todo.id}
          className={classNames('todo', { completed: todo.completed })}
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
