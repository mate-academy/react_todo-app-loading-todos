import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  onChange: (todo: Todo) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
};

export const TodoList = ({ todos, onChange, onRemove }: Props) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onChange={onChange}
          onRemove={onRemove}
        />
      ))}
    </section>
  );
};
