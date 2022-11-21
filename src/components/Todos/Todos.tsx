import { Todo } from '../../types/Todo';
import { SingleTodo } from '../SingleTodo/Index';

type Props = {
  todos: Todo[];
};

export const Todos: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <SingleTodo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
