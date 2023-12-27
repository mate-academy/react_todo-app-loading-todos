import { FC } from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList: FC<Props> = (props) => {
  const { todos } = props;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* <section className="todoapp__main" data-cy="TodoList"> */}
      {todos.map((todo) => (
        <div
          data-cy="Todo"
          className={classnames('todo',
            {
              completed: todo.completed,
            })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>
          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
