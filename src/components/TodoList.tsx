import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(({ title, completed, id }) => (
        <TodoItem
          title={title}
          completed={completed}
          id={id}
          key={id}
        />
      ))}
    </section>
  );
};
