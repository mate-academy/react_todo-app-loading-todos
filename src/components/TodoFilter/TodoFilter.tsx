import cn from 'classnames';
import { TodoFilterEnum } from '../../types/types';

interface Props {
  filter: TodoFilterEnum;
  setFilter: (newFilter: TodoFilterEnum) => void;
}

export const TodoFilter: React.FC<Props> = ({
  filter,
  setFilter,
}) => (
  <nav className="filter">
    <a
      href="#/"
      className={cn('filter__link', {
        selected: filter === TodoFilterEnum.ALL,
      })}
      onClick={(e) => {
        e.preventDefault();
        setFilter(TodoFilterEnum.ALL);
      }}
    >
      All
    </a>

    <a
      href="#/active"
      className={cn('filter__link', {
        selected: filter === TodoFilterEnum.ACTIVE,
      })}
      onClick={(e) => {
        e.preventDefault();
        setFilter(TodoFilterEnum.ACTIVE);
      }}
    >
      Active
    </a>

    <a
      href="#/completed"
      className={cn('filter__link', {
        selected: filter === TodoFilterEnum.COMPLETED,
      })}
      onClick={(e) => {
        e.preventDefault();
        setFilter(TodoFilterEnum.COMPLETED);
      }}
    >
      Completed
    </a>
  </nav>
);
