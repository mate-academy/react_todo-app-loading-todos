import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[] | null;
};

export function TodoList({ todos }: Props) {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos?.map(todo => <TodoItem todo={todo} key={todo.id} />)}
    </section>
  );
}
