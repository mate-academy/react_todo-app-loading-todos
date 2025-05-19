import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  isLoading?: boolean;
};

export const TodoList: React.FC<Props> = ({ todos, isLoading }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} isLoading={isLoading} />;
      })}
    </section>
  );
};
