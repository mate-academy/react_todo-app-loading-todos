import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

type TodoListProps = {
  todos: Todo[];
  selectedFilter: 'all' | 'active' | 'completed'
};

export const TodoList: React.FC<TodoListProps> = (
  { todos, selectedFilter },
) => {
  const visibleTodos = todos.filter((todo) => {
    if (selectedFilter === 'active') {
      return !todo.completed;
    }

    if (selectedFilter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => {
        return <TodoInfo todo={todo} />;
      })}
    </section>
  );
};
