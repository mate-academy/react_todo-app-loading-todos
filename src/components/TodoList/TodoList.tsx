import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todoList: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({
  todoList,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todoList.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', {
            completed: todo.completed,
          })}
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
            x
          </button>
        </div>
      ))}
    </section>
  );
};
