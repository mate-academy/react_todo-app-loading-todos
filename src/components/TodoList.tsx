import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  filter: Filter;
  loading: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  filter,
  loading,
}) => {
  const fileredTodos = todos.filter(todo => {
    if (filter === Filter.active) {
      return !todo.completed;
    }

    if (filter === Filter.completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        fileredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)
      )}
    </section>
  );
};
