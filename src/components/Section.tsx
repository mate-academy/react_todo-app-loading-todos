import { TasksFilter } from '../types/tasksFilter';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[],
  tasksFilter: TasksFilter
}

export const Section:React.FC<Props> = ({
  todos,
  tasksFilter,
}) => {
  let filteringTodos;

  switch (tasksFilter) {
    case TasksFilter.active:
      filteringTodos = todos.filter((todo) => !todo.completed);
      break;

    case TasksFilter.completed:
      filteringTodos = todos.filter((todo) => todo.completed);
      break;

    default:
      filteringTodos = todos;
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteringTodos.map(({ title, id, completed }) => (
        <div
          data-cy="Todo"
          className={`todo ${completed ? 'completed' : ''}`}
          key={id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span
            data-cy="TodoTitle"
            className="todo__title"
          >
            {title}
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
