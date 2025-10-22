import { Todo } from '../../types/Todo';
import TodoItem from '../Todo/TodoItem';

/* eslint-disable jsx-a11y/label-has-associated-control */
type Props = {
  todos: Todo[];
};
export default function TodoList({ todos }: Props) {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
}
