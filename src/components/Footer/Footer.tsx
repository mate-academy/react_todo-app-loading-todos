import classNames from 'classnames';
import { FC } from 'react';
import { FilterType } from '../../types/FilterType';
import { Todo } from '../TodoItem/Todo';

interface Props {
  todos: Todo[],
  filterType: FilterType,
  onChangeFilterType: (filterType: FilterType) => void,
}

export const Footer: FC<Props> = (props) => {
  const { todos, filterType, onChangeFilterType } = props;

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodos.length} items left`}
      </span>

      <nav className="filter">
        {Object.values(FilterType).map(value => (
          <a
            href={`#/${value}`}
            key={value}
            className={classNames('filter__link', {
              selected: value === filterType,
            })}
            onClick={() => onChangeFilterType(value)}
          >
            {`${value.slice(0, 1).toUpperCase()}${value.slice(1)}`}
          </a>
        ))}
      </nav>

      {completedTodos.length > 0 && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
