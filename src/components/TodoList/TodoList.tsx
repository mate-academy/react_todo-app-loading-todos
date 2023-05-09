import { Todo } from '../../types/Todo';
import { TodoInfo } from '../Todo/TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map((todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </>
  );
};
