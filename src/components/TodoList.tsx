import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
};

export const TodoList: React.FC<Props> = ({ todos, filter }) => {
  const getVisibleTodos = () => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {getVisibleTodos()
        .map((todo: Todo) => <TodoItem key={todo.id} todo={todo} />)}
    </section>
  );
};
