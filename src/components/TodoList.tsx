import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';
import { ErrorType } from '../types/Error';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  setError: (value: ErrorType) => void;
};

export const TodoList: React.FC<Props> = ({ todos, setTodos, setError }) => {
  return (
    <section className="todoapp__main">
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          setError={setError}
          key={todo.id}
        />
      ))}
    </section>
  );
};
