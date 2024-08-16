import { TodoItem } from '../Todo/TodoItem';

import { Todo } from '../../types/Todo';

type TodoListProps = {
  todos: Todo[];
  filter: string;
  onDelete: (id: number) => void;
  isLoading: boolean;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  filter,
  onDelete,
  isLoading,
}) => {
  const findVisibleTodos = () => {
    switch (filter) {
      case 'all':
        return todos;
      case 'active':
        return todos?.filter(todo => !todo.completed);
      case 'completed':
        return todos?.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const visibleTodos = findVisibleTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos?.map(todo => (
        <TodoItem
          isLoading={isLoading}
          onDelete={onDelete}
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
};
