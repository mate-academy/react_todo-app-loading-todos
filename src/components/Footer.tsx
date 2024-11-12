import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { Status } from './status';

interface Props {
  posts: Todo[];
  filterStatus: (status: Status) => void;
  status: Status;
}

export const FooterPart: React.FC<Props> = ({
  posts,
  filterStatus,
  status,
}) => {
  const count =  posts.filter(value => !value.completed).length;
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {count} items left
      </span>
      <nav className="filter" data-cy="Filter">
        {Object.values(Status).map(val => (
          <a
            key={val}
            href={`#/${val.toLowerCase()}`}
            className={cn('filter__link', {
              selected: status === val,
            })}
            data-cy={`FilterLink${val}`}
            onClick={() => filterStatus(val)}
          >
            {val}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!posts.find(element => element.completed)}
        // onClick={}
      >
        Clear completed
      </button>
    </footer>
  );
};
