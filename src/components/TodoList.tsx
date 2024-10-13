import { Todo } from '../types/Todo';
import { ToDo } from './Todo';

type Props = {
  todoList: Todo[];
};

export const TodoList: React.FC<Props> = ({ todoList }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todoList.map(todo => (
        <ToDo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
