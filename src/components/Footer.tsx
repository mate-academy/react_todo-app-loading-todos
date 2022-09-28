import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

interface TabTypes {
  id: string,
  title: string,
}

interface Props {
  tabs: TabTypes[],
  selectedTabId: string,
  onTabSelected: (value: TabTypes) => void,
  todos: Todo[],
}

export const Footer: React.FC<Props> = ({
  tabs,
  selectedTabId,
  onTabSelected,
  todos,
}) => {
  const selectedTab = tabs.find(tab => tab.id === selectedTabId) || tabs[0];

  const handelClick = (tab: TabTypes) => {
    if (selectedTabId !== tab.id) {
      onTabSelected(tab);
    }
  };

  const notCompleted = todos.filter((todo) => todo.completed === false);

  return (

    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompleted.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {tabs.map((tab: TabTypes) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            data-cy="FilterLinkAll"
            className={classNames('filter__link',
              {
                'is-selected': tab.id === selectedTab.id,
              },
            )}
            onClick={() => handelClick(tab)}
          >
            {tab.title}
          </a>

        ))}
      </nav>

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
