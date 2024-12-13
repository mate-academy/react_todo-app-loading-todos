import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type TodoListProps = {
  onDeleteTodo: (id: number) => void;
  todos: Todo[];
};

export function TodoList({ onDeleteTodo, todos }: TodoListProps) {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem todo={todo} onDeleteTodo={onDeleteTodo} key={todo.id} />
      ))}
    </section>
  );
}
