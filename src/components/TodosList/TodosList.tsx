import { TodosItem } from '../TodosItem/TodosItem';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[]
}

export const TodosList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodosItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
