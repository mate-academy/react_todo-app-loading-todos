import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type FilterProps = {
  filteredTodo: Todo[];
};

export const TodoList: React.FC<FilterProps> = ({ filteredTodo }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodo.map(todo => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
