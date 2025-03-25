import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItems';

type Props = {
  filteredTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ filteredTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.slice(0, 5).map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
