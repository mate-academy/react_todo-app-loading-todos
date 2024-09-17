import { TodoInfo } from './TodoInfo';
import { Todo } from './types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => {
      return <TodoInfo key={todo.id} todo={todo} />;
    })}
  </section>
);
