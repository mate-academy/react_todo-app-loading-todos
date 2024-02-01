import { Todo } from '../../types';
import { ItemTodo } from '../ItemTodo/Item';

type Props = {
  todos: Todo[] | null;
};

export const ListTodo: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos?.map(todo => (
        <ItemTodo todo={todo} />
      ))}
    </section>
  );
};
