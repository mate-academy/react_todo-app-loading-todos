import cn from 'classnames';
import { Tabs } from '../../types/Helpers';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTab: Tabs;
  setFilteredTodos: (value: React.SetStateAction<Todo[]>) => void;
  setSelectedTab: (value: React.SetStateAction<Tabs>) => void;
}

export const Footer: React.FC<Props> = ({
  todos,
  selectedTab,
  setFilteredTodos,
  setSelectedTab,
}) => {
  const todosLeft = todos.filter(todo => !todo.completed).length;
  const thereAreCompleted = todos.some(todo => todo.completed);

  const handleTabs = (tab: Tabs) => {
    switch (tab) {
      case Tabs.Active:
        setFilteredTodos(todos.filter(todo => !todo.completed));
        setSelectedTab(Tabs.Active);
        break;
      case Tabs.Completed:
        setFilteredTodos(todos.filter(todo => todo.completed));
        setSelectedTab(Tabs.Completed);
        break;
      default:
        setFilteredTodos(todos);
        setSelectedTab(Tabs.All);
    }
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeft === 1
          ? `${todosLeft} item left `
          : `${todosLeft} items left `}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: selectedTab === Tabs.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleTabs(Tabs.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: selectedTab === Tabs.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleTabs(Tabs.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: selectedTab === Tabs.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleTabs(Tabs.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      {thereAreCompleted && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={() => {}}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
