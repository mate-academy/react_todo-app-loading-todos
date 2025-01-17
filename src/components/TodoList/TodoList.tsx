import { Todo } from '../../types/Todo';
import { TodoCard } from '../TodoCard/TodoCard';

type Props = {
  todos: Todo[];
  deleteTodo: (todoId: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, deleteTodo }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return <TodoCard todo={todo} key={todo.id} deleteTodo={deleteTodo} />;
      })}
    </section>
  );
};
