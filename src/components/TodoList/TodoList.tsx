import { Todo } from '../../types/Todo';
import { TodoCard } from '../TodoCard/TodoCard';

interface Props {
  todos: Todo[];
}
export const TodoList: React.FC<Props> = props => {
  const { todos } = props;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoCard
          key={todo.id}
          title={todo.title}
          isCompleted={todo.completed}
        />
      ))}
    </section>
  );
};
