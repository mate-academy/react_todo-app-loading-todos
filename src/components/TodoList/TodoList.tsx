import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  onDelete?: (todoId: number) => void;
  onEdit?: (todo: Todo | null) => void;
  onSubmit: (todo: Todo) => Promise<void>;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  onDelete = () => {},
  onEdit = () => {},
  onSubmit,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos?.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          selectedTodo={selectedTodo}
          onDelete={onDelete}
          onEdit={onEdit}
          onSubmit={onSubmit}
        />
      ))}
    </section>
  );
};
