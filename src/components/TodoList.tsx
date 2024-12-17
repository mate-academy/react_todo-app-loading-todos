import { Todo } from '../types/Todo';
import { TodoComponent } from './TodoComponent';

type Props = {
  filteredTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ filteredTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <div>
        {filteredTodos.map(todo => (
          <TodoComponent key={todo.id} todo={todo} />
        ))}
      </div>
    </section>
  );
};
