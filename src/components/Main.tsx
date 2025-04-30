import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  SortItems: Todo[];
  allActive: boolean;
}

export const Main: React.FC<Props> = ({ SortItems, allActive }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {SortItems.map(todo => {
        return <TodoItem key={todo.id} todo={todo} allActive={allActive} />;
      })}
    </section>
  );
};
