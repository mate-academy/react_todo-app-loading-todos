import { TodoListItem } from '../TodoListItem';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
