import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  visibleTodos: Todo[],
};

export const TodoList: React.FC<Props> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
