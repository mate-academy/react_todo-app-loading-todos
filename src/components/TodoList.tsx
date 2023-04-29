import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <div>
    {todos.map((todo: Todo) => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </div>
);
