import { Todo } from '../types/Todo';
import { TodoInfo } from './Todo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(({ title, completed, id }) => (
        <TodoInfo
          key={id}
          title={title}
          completed={completed}
        />
      ))}
    </section>
  );
};
