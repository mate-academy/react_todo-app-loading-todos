import { Todo } from '../../types/Todo';
import TodoItem from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
};

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(e => (
        <TodoItem key={e.id} data-cy="Todo" visibleGoods={e} />
      ))}
    </section>
  );
};

export default TodoList;
