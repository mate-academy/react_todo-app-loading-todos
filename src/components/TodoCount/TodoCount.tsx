import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  filterTodos: FilterType;
};

export const TodoCount = ({ todos, filterTodos }: Props) => {
  const todosLeft = () => {
    let leftTodos = todos;

    if (filterTodos === 'active') {
      leftTodos = todos.filter(todo => !todo.completed);

      return leftTodos.length;
    }

    if (filterTodos === 'completed') {
      leftTodos = todos.filter(todo => todo.completed);

      return leftTodos.length;
    }

    return leftTodos.length;
  };

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
