// TodoList.tsx
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  toggleTodo: (todo: Todo) => void;
  isLoading: boolean;
  deleteTodo: (todo: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleTodo,
  isLoading,
  deleteTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          isLoading={isLoading}
          deleteTodo={deleteTodo}
        />
      ))}
    </section>
  );
};
