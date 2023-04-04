import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal/TodoModal';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <>
    {todos.map((todo) => (
      <TodoModal todo={todo} key={todo.id} />
    ))}
  </>
);
