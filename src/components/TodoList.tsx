import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

interface TodoListProps {
  todos: Todo[],
  filter: Filter,
}

export const TodoList: React.FC<TodoListProps> = ({ todos, filter }) => {
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.All:
        return true;
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        throw new Error('wrong filter selected');
    }
  });

  return (
    <section className="todoapp__main">
      {filteredTodos.map(todo => {
        const {
          id, title, completed,
        } = todo;

        return (
          <div className={`todo ${completed ? 'completed' : ''}`} key={id}>
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                checked={completed}
              />
            </label>

            <span className="todo__title">{title}</span>

            {/* Remove button appears only on hover */}
            <button type="button" className="todo__remove">×</button>

            {/* overlay will cover the todo while it is being updated */}
            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
};
