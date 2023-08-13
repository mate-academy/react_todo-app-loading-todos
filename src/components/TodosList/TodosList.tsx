import { Todo } from '../../types/Todo';
import { TodosItem } from '../TodosItem/TodosItem';

type Props = {
  todos: Todo[];
};

export const TodosList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => <TodosItem todo={todo} key={todo.id} />)}
    </section>
  );
};
