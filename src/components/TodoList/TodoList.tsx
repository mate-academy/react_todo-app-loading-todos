import { Todo } from '../../types/Todo';
import { TodoCard } from '../Todo/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
          />
        ))}
    </section>
  );
};
