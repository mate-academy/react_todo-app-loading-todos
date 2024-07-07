import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type TodoListProps = {
  selectedTodos: Todo[];
  onCheckTodo: (todoId: number) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  selectedTodos,
  onCheckTodo,
}) => {
  if (selectedTodos.length === 0) {
    return null;
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {selectedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onCheckTodo={onCheckTodo} />
      ))}
    </section>
  );
};
