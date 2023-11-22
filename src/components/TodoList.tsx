import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  onUpdateTodos: (todo: Todo) => void,
};

export const TodoList: React.FC<Props> = ({ todos, onUpdateTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onUpdateTodos={onUpdateTodos}
        />
      ))}
    </section>
  );
};
