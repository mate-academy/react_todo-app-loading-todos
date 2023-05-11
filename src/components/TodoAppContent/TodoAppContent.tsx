import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todoList: Todo[];
};

export const TodoAppContent: React.FC<Props> = ({ todoList }) => {
  return (
    <section className="todoapp__main">
      {todoList.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
