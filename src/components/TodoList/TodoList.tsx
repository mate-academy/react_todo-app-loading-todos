import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type TodoListProps = {
  todos: Todo[];
  handleDeleteTodo: (todoId: number) => void;
  handleEditTodo: (property: string, value: any, todoId: number) => void;
  loadingId: number | null;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleDeleteTodo,
  handleEditTodo,
  loadingId,
}) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
          loadingId={loadingId}
        />
      ))}
    </section>
  );
};
