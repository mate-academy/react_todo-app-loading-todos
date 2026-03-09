import { ErrorMessage } from '../types/ErrorMessage';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  updateTodos: (todos: Todo[]) => void;
  setError: (message: ErrorMessage) => void;
};

export const TodoList: React.FC<Props> = ({ todos, updateTodos, setError }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          updateTodos={updateTodos}
          setError={setError}
          key={todo.id * (todo.isLoading ? -1 : 1)}
        />
      ))}
    </section>
  );
};
