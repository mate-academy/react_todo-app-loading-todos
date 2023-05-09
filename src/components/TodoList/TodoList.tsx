import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';
import { Errors } from '../../types/Errors';

type Props = {
  todos: Todo[];
  onChangeIsError: (e: Errors) => void
};

export const TodoList: React.FC<Props> = ({ todos, onChangeIsError }) => (
  <div>
    {todos.map((todo: Todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onChangeIsError={onChangeIsError}
      />
    ))}
  </div>
);
