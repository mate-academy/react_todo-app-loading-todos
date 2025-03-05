import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

type Props = {
  onToggle: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  loading: boolean;
  filtered: Todo[];
  id: number;
};

export const TodoList: React.FC<Props> = ({
  onToggle,
  onDeleteTodo,
  loading,
  filtered,
  id,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filtered.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDeleteTodo={onDeleteTodo}
          loading={loading}
          id={id}
        />
      ))}
    </section>
  );
};
