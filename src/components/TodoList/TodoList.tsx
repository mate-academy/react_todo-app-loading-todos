import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(({ title, completed, id }) => (
        <TodoInfo
          title={title}
          completed={completed}
          key={id}
        />
      ))}
    </section>
  );
};
