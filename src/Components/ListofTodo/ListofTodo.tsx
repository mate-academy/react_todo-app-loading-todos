import { Todo } from '../../types/Todo';
import { Todos } from '../Todos/Todos';

type Props = {
  todos: Todo[];
};

export const ListofTodo: React.FC<Props> = ({ todos }) => (
  <>
    {todos.map((todo) => (
      <Todos todo={todo} key={todo.id} />
    ))}
  </>
);
