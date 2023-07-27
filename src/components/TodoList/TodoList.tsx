import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[] | null,
};

export const TodoList:React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos?.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </>
  );
};
