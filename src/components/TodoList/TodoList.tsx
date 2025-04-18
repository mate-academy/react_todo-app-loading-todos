import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type P = {
  todos: Todo[];
};

export const TodoList: React.FC<P> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
