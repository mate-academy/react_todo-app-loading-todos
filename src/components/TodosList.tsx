import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[]
};

export const TodosList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <div
          key={todo.id}
          className={classNames('todo', { completed: todo.completed })}
        >
          <TodoInfo todo={todo} />
        </div>
      ))}
    </section>
  );
};
