import cn from 'classnames';
import { useState } from 'react';

enum TodoSelectionType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}
type Props = {
  selectedTodo: (value: string) => void,
  isSelectedTodo: string,
};
export const TodoFilter: React.FC<Props> = ({
  selectedTodo, isSelectedTodo,
}) => {
  const [selected, setSelected] = useState(true);

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn(
          'filter__link', {
            selected,
          },
        )}
        data-cy="FilterLinkAll"
        onClick={() => {
          selectedTodo(TodoSelectionType.ALL);
          setSelected(true);
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn(
          'filter__link', {
            selected: TodoSelectionType.ACTIVE === isSelectedTodo,
          },
        )}
        data-cy="FilterLinkActive"
        onClick={() => {
          selectedTodo(TodoSelectionType.ACTIVE);
          setSelected(false);
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn(
          'filter__link', {
            selected: TodoSelectionType.COMPLETED === isSelectedTodo,
          },
        )}
        data-cy="FilterLinkCompleted"
        onClick={() => {
          selectedTodo(TodoSelectionType.COMPLETED);
          setSelected(false);
        }}
      >
        Completed
      </a>
    </nav>
  );
};
