import { memo } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  preparedTodos: Todo[]
};

export const TodoList: React.FC<Props> = memo(({ preparedTodos }) => (
  <section className="todoapp__main">
    {preparedTodos.map(todo => (
      <div
        className={cn('todo', {
          completed: todo.completed,
        })}
        key={todo.id}
      >
        <label className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
            defaultChecked={todo.completed}
          />
        </label>

        <span className="todo__title">{todo.title}</span>
        <button type="button" className="todo__remove">×</button>

        {/* className="modal overlay is-active" */}

        <div className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    ))}
  </section>
));
