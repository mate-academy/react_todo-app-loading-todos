import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

type Props = {
  tasks: Todo[];
};

const TodoList: React.FC<Props> = ({ tasks }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {tasks.map(task => (
        <TodoItem key={task.id} todo={task} />
      ))}
    </section>
  );
};

export default TodoList;
