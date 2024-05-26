import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { handleFilterTodos } from '../../utils/filteredTodos';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: Todo[];
  filterBy: Status;
}

export const TodoList: React.FC<Props> = ({ todos, filterBy }) => {
  const filteredTodos = handleFilterTodos(todos, filterBy);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
