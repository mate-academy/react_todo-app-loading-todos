import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
  onUpdateTodo: (updatedTodo: Todo) => Promise<void>;
  onDeleteTodo: (todoId: number) => void;
  loadingTodoIds: number[];
}

export const TodoList: React.FC<Props> = ({
  todos,
  loadingTodoIds,
  onUpdateTodo,
  onDeleteTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isLoading={loadingTodoIds.some(id => id === todo.id)}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </section>
  );
};
