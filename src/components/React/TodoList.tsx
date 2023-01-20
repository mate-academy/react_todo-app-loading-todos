import { Todo } from '../../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[],
  filter: string,
};

export const TodoList: React.FC<Props> = ({
  todos,
  filter,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos
        .filter(todo => {
          switch (filter) {
            case 'active':
              return !todo.completed;

            case 'completed':
              return todo.completed;

            default: return todo;
          }
        })
        .map(todo => {
          return (
            <TodoInfo
              todo={todo}
              key={todo.id}
            />
          );
        })}
    </section>
  );
};
