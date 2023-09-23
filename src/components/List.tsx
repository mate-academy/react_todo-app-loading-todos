import { Todo } from '../types/Todo';
import { Main } from './Main';

type Props = {
  filterTodos: Todo[]
};

export const List: React.FC<Props> = ({ filterTodos }) => {
  return (
    <section className="todoapp__main">
      {filterTodos?.map(todo => (
        <Main
          todo={todo}
          key={todo.id}
        />
      ))}
    </section>

  );
};
