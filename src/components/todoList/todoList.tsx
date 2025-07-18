import { Todo } from '../../types/Todo';
import { TodoItem } from '../Todo/todo';

type Props = {
  todoList: Todo[];
};

export const TodoList: React.FC<Props> = ({ todoList }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todoList.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
