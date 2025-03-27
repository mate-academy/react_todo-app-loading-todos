import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[];
  load: boolean;
};

export const TodoList: React.FC<Props> = ({ todos, load }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.length > 0 &&
        todos.map(todo => <TodoInfo todo={todo} load={load} key={todo.id} />)}
    </section>
  );
};
