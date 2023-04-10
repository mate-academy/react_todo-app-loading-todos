import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="todoapp__main">
    {todos.map((todo) => (
      <div
        className={classNames('todo', {
          completed: todo.completed,
        })}
        key={todo.id}
      >
        <TodoInfo todo={todo} />
      </div>
    ))}
  </section>
);
