import { Todo } from '../types/Todo';
import { TodoItems } from './TodoItems';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({
  todos,
}) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <TodoItems
          todo={todo}
          key={todo.id}
        />
      ))}

    </section>
  );
};
