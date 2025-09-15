import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  filteredTodos: Todo[];
  onToggle: (value: number) => void;
};

export const TodoList: React.FC<Props> = ({ filteredTodos, onToggle }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        return <TodoItem todo={todo} key={todo.id} onToggle={onToggle} />;
      })}
    </section>
  );
};
