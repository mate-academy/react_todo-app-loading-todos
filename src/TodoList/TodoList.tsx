import { TodoItem } from '../TodoItem';
import { useTodos } from '../context/TodosContext';

export const TodoList: React.FC = () => {
  const { todos, filterStatus } = useTodos();

  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case 'Active':
        return !todo.completed;
      case 'Completed':
        return todo.completed;
      case 'All':
      default:
        return todo;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
