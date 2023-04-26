import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul style={{ listStyleType: 'none' }}>
    {todos.map((todo: Todo) => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </ul>
);
