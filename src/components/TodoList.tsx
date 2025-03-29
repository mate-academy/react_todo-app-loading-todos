import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  visibleTodos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const TodoList = ({ visibleTodos, toggleTodo, deleteTodo }: Props) => (
  <div>
    {visibleTodos.map(todo => (
      <TodoItem
        todo={todo}
        key={todo.id}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    ))}
  </div>
);
