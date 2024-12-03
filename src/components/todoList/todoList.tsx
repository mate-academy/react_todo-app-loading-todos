import { TodoInterface } from '../../types/Todo';
import { Todo } from '../todo/todo';

interface Props {
  filteredTodos: TodoInterface[];
}

export const TodoList: React.FC<Props> = ({ filteredTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
