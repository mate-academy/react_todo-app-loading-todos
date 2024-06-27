import * as React from 'react';
import { IsActiveLink } from '../../types/types';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface FooterProps {
  todos: Todo[];
  link: IsActiveLink;
  setLink: (arg: IsActiveLink) => void;
}

export const Footer: React.FC<FooterProps> = ({ todos, link, setLink }) => {
  const activeTodos = React.useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const isAnyCompleted = React.useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(IsActiveLink).map(item => (
          <a
            key={item}
            href={link === 'All' ? '#/' : `#/${item}`}
            className={classNames('filter__link', {
              selected: link === item,
            })}
            data-cy={`FilterLink${item}`}
            onClick={() => setLink(item)}
          >
            {item}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isAnyCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
