import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

type Props = {
  todos : Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      <div>
        {todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </div>
    </section>
  );
};
