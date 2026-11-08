import cn from 'classnames';
import './TodoList.scss'
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  visibleTodos: Todo[] | undefined;
};

export const TodoList = ({ visibleTodos }: Props) => {
  return visibleTodos?.map(todo => (
    <div
      key={todo.id}
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.completed,
      })}
    >
      <TodoInfo todo={todo} />
    </div>
  ));
};
