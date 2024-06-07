import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  loading: boolean;
};

export const TodoList: React.FC<Props> = ({ todos, loading }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} todoLoading={loading} />
      ))}
    </section>
  );
};
