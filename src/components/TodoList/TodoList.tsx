import { useTodosState } from '../../contexts/TodosContext';
import { TodoStatus } from '../../types/TodoStatus';
import { TodoItem } from '../TodoItem';

const FILTERS = {
  all: 'all',
  completed: 'completed',
  active: 'active',
};

type Props = {
  isLoading: boolean;
  filterBy: TodoStatus;
};

export const TodoList: React.FC<Props> = ({ isLoading, filterBy }) => {
  const [todos] = useTodosState();

  const prepareTodos = () => {
    switch (filterBy) {
      case FILTERS.active:
        return todos.filter(todo => !todo.completed);
      case FILTERS.completed:
        return todos.filter(todo => todo.completed);
      case FILTERS.all:
      default:
        return todos;
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {prepareTodos().map(todo => (
        <TodoItem
          todo={todo}
          isLoading={isLoading}
          key={todo.id}
        />
      ))}
    </section>
  );
};
