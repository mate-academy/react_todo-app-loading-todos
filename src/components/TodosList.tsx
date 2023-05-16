import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[]
};

export const TodosList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <TodoInfo todo={todo} />
      ))}
    </section>
  );
};
