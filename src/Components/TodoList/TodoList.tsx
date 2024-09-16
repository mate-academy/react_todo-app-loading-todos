/* eslint-disable jsx-a11y/label-has-associated-control */
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  currentTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ currentTodos }) => {
  return (
    <div>
      {currentTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
