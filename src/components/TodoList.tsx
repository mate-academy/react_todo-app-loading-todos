import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  onToggle: (id: number, completed: boolean) => void;
  loadingTodoId: number[];
  onDelete: (id: number) => Promise<void>;
  onRename: (id: number, title: string) => Promise<boolean>;
};

export const TodoList = ({
  todos,
  onToggle,
  loadingTodoId,
  onDelete,
  onRename,
}: Props) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          loadingTodoId={loadingTodoId}
          onDelete={onDelete}
          onRename={onRename}
        />
      ))}
    </section>
  );
};
