import { Todo } from '../../types/Todo';
import { TodosItem } from '../TodosItem';

type Props = {
  todos: Todo[] | null,
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos && todos.map((todo: Todo) => (
        <TodosItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
};
