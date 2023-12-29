import { useMemo } from 'react';
import { TodoItem } from './TodoItem';
import { getFilteredTodos } from '../servises/getFilteredTodos';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

type Props = {
  todos: Todo[]
  status: Status
};

export const TodosList: React.FC<Props> = ({ todos, status }) => {
  // const [isAllCheked, setIsAllCheked] = useState(false);

  const filteredTodo = useMemo(() => {
    return getFilteredTodos(todos, status);
  }, [todos, status]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodo.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
};
