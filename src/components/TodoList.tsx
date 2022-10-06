import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(({ id, title, completed }) => (
        <TodoInfo
          key={id}
          title={title}
          completed={completed}
        />
      ))}
    </section>
  );
};
