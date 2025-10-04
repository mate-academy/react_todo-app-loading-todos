import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  onToggleTodo: (id: number, completed: boolean) => void;
  loadingTodoId: number | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onToggleTodo,
  loadingTodoId,
}) => {
  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        {todos.map(todo => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggleTodo}
              isLoading={loadingTodoId === todo.id}
            />
          );
        })}
      </section>
    </>
  );
};
