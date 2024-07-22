import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  filteredTodos: Todo[];
  loading: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({
  filteredTodos,
  loading,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)
      )}
    </section>
  );
};
