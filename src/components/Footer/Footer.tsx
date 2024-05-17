import cn from 'classnames';

import { SortFields } from '../../types/sortFields';
import { Todo } from '../../types/Todo';

type Props = {
  setSelectedField: (string: SortFields) => void;
  selectedField: string;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({
  setSelectedField,
  selectedField,
  todos,
}) => {
  const isAnyCompleted = todos.every(todo => !todo.completed);
  const todosLeft = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeft} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: selectedField === SortFields.default,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setSelectedField(SortFields.default)}
        >
          {SortFields.default}
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: selectedField === SortFields.active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setSelectedField(SortFields.active)}
        >
          {SortFields.active}
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: selectedField === SortFields.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setSelectedField(SortFields.completed)}
        >
          {SortFields.completed}
        </a>
      </nav>

      {!isAnyCompleted && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
