import classNames from 'classnames';
import FlipMove from 'react-flip-move';
import React, {
  useContext, useEffect, useState,
} from 'react';
import { SortParam } from '../../types/SortParam';
import { Todo } from '../../types/Todo';
import { NavContext } from '../NavContext';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const { sortBy } = useContext(NavContext);
  const [height, setHeight] = useState<string>('0px');

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

  useEffect(() => {
    setHeight(`${58 * visibleTodos.length}px`);
  }, [visibleTodos]);

  return (
    <ul
      className="todoapp__main"
      data-cy="TodoList"
      style={{ height, transition: 'all 0.5s', overflowY: 'hidden' }}
    >
      <FlipMove
        staggerDurationBy="30"
        duration={300}
        enterAnimation="accordionVertical"
        leaveAnimation="accordionVertical"
        typeName="ul"
      >
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
      </FlipMove>
    </ul>
  );
};
