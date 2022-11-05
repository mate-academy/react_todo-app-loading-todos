import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <li
        key={todo.id}
        data-cy="Todo"
        className={classNames('todo',
          {
            completed: todo.completed,
          })}
      >
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
