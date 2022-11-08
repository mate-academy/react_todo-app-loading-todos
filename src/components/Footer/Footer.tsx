import { useMemo } from 'react';
import { GroupBy } from '../../types/GroupBy';
import { Todo } from '../../types/Todo';
import { Navigation } from '../Navigation/Navigation';

type Props = {
  groupBy: GroupBy
  setGroupBy: (status: GroupBy) => void
  todos: Todo[]
};

export const Footer: React.FC<Props> = ({
  groupBy,
  setGroupBy,
  todos,
}) => {
  const uncompletedCount = useMemo(() => todos
    .filter(({ completed }) => !completed).length, [todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedCount} items left`}
      </span>

      <Navigation
        groupBy={groupBy}
        setGroupBy={setGroupBy}
      />

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
