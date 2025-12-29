import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  onDelete: (id: number) => Promise<void | Todo>;
  deletingTodoIds: number[];
  onUpdate: (id: number, data: Partial<Todo>) => Promise<void | Todo>;
  updatingTodoIds: number[];
};

export const TodoList = ({
  todos,
  onDelete,
  deletingTodoIds,
  onUpdate,
  updatingTodoIds,
}: Props) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          deletingTodoIds={deletingTodoIds}
          onUpdate={onUpdate}
          updatingTodoIds={updatingTodoIds}
        />
      ))}
    </section>
  );
};
