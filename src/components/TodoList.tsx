import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';
type Props = {
  filteredTodos: Todo[];
};

const TodoList = ({ filteredTodos }: Props) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </section>
  );
};

export default TodoList;
