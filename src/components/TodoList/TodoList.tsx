import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todoapp__main">
    {todos.map(todo => (
      <li key={todo.id}>
        <TodoItem todo={todo} />
      </li>
    ))}
  </ul>
);
