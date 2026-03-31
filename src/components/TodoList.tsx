import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  deletingIds: number[];
  onDelete: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, deletingIds, onDelete }) => {
  return (
    <>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isDeleting={deletingIds.includes(todo.id)}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};
