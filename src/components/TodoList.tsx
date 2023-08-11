import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <div
          key={todo.id}
          className={classNames('todo', {
            completed: todo.completed === true,
          })}
        >
          <TodoItem todo={todo} />
        </div>
      ))}
    </section>

  );
};
