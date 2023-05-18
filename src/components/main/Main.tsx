import { Todo } from '../../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
}
export const Main: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos ? todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      )) : (
        <span>Loading...</span>
      )}
    </section>
  );
};
