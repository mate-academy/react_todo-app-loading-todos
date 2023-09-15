import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoCount = ({ todos }: Props) => {
  const todosLeft = () => todos.length;

  return (
    <span className="todo-count">
      {todosLeft()}
      {' '}
      {todosLeft() === 1 ? 'item' : 'items'}
      {' '}
      left
    </span>

  );
};
