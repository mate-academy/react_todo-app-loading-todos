import { TodoElement } from '../Todo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoElement todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
