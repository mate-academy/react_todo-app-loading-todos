import { Filter } from '../Filter';
import { Tab } from '../../types/Tab';
import { Todo } from '../../types/Todo';

type Props = {
  tabs: Tab[];
  selectedTabId: string;
  onTabSelected: (value:Tab) => void;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({
  tabs,
  selectedTabId,
  onTabSelected,
  todos,
}) => {
  const activeTodos = todos.filter(({ completed }) => !completed).length;

  return (

    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos} items left`}
      </span>
      <Filter
        tabs={tabs}
        selectedTabId={selectedTabId}
        onTabSelected={onTabSelected}
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
