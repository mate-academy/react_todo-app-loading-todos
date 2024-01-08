import { Status } from '../../../../../types/Status';
import { Todo } from '../../../../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[]
  status: Status
};

export const TodoList: React.FC<Props> = ({ todos, status }) => {
  let filterTodos = todos;

  const activeFilter = filterTodos.filter((todo: Todo) => !todo.completed);
  const completedFilter = filterTodos.filter((todo: Todo) => todo.completed);

  switch (status) {
    case Status.All:
      filterTodos = todos;
      break;

    case Status.Active:
      filterTodos = activeFilter;
      break;

    case Status.Completed:
      filterTodos = completedFilter;
      break;

    default:
      break;
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filterTodos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
        />
      ))}

    </section>
  );
};
