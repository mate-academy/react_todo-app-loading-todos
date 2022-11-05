import classNames from 'classnames';
import { useContext } from 'react';
import { SortParam } from '../../types/SortParam';
import { Todo } from '../../types/Todo';
import { NavContext } from '../NavContext';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const { sortBy } = useContext(NavContext);

  const getSortedTodos = (sortingBy: SortParam) => {
    switch (sortingBy) {
      case SortParam.Active:
        return todos.filter(todo => !todo.completed);

      case SortParam.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const visibleTodos = getSortedTodos(sortBy);

  return (
    <ul className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
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
};
