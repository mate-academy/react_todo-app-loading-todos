import { useTodos } from '../hooks/useTodos';
import { TodoCard } from './TodoCard';

interface TodoListProps {
  todoListState: ReturnType<typeof useTodos>;
  query?: string;
  setQuery?: (query: string) => void;
  loadingTodoId?: number | null;
  setLoadingTodoId?: (id: number | null) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todoListState }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todoListState.todosFiltered.map(todo => (
        <TodoCard
          key={todo.id}
          todo={todo}
          loadingTodoId={todoListState.loadingTodo}
        />
      ))}
      {todoListState.tempTodo && (
        <TodoCard
          key={0}
          todo={todoListState.tempTodo}
          loadingTodoId={todoListState.loadingTodo}
        />
      )}
    </section>
  );
};
