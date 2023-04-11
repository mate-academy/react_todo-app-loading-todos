import { Todo } from '../../types/Todo';
import { TodoElement } from '../TodoElement/TodoElement';

type Props = {
  todos: Todo[],
};

export const ListOfTodos: React.FC<Props> = ({ todos }) => (
  <>
    {todos.map((todo) => (
      <TodoElement todo={todo} key={todo.id} />
    ))}
  </>
);
