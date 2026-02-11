import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="todoapp__main">
    {todos.map(todo => (
      <div
        key={todo.id}
        data-cy="Todo"
        className={classNames('todo', { completed: todo.completed })}
      >
        <div className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
            data-cy="TodoStatus"
            checked={todo.completed}
            readOnly
          />
        </div>

        <span className="todo__title" data-cy="TodoTitle">
          {todo.title}
        </span>

        <button type="button" className="todo__remove" data-cy="TodoDelete">
          x
        </button>

        <div className="modal overlay" data-cy="TodoLoader">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>

        <input
          type="text"
          className="todo__title-field"
          data-cy="TodoTitleField"
          value={todo.title}
          readOnly
        />
      </div>
    ))}
  </section>
);
