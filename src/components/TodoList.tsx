import { LocalTodosArrayType } from '../types/Todo';
import Todo from './Todo';

type Props = { displayTodos: LocalTodosArrayType };

export default function TodoList({ displayTodos }: Props) {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {displayTodos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </section>
  );
}
