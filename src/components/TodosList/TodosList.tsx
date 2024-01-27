import { Todo } from '../../types/Todo';
import { TodoComponent } from '../TodoComponent';

type Props = {
  todos: Todo[] | null;
};

export const TodosList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todoapp__main" data-cy="TodoList">
      {todos?.map((todo) => (
        <TodoComponent key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
