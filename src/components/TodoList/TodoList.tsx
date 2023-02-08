import { Todo } from '../../types/Todo';
import { TodoContent } from '../TodoContent/TodoContent';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoContent
          todo={todo}
          key={todo.id}
        />
      ))}

    </section>
  );
};
