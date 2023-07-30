import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TabsFooter } from '../enums/TabsFooter';

type Props = {
  todos: Todo[],
  setAvtiveTab: (value: string) => void;
  avtiveTab: string,
};

export const Footer: React.FC<Props> = ({ todos, setAvtiveTab, avtiveTab }) => {
  const tabs: string[] = Object.values(TabsFooter);
  const itemsLeft = todos.filter(todo => !todo.completed).length;
  const completed = todos.find(todo => todo.completed);
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setAvtiveTab(e.currentTarget.textContent || 'All');
  };

  return (
    <>
      {Boolean(todos.length) && (
        <footer className="todoapp__footer">
          <span className="todo-count">
            {`${itemsLeft} items left`}
          </span>

          <nav className="filter">
            {tabs.map((tab) => (
              <a
                href={`#/${tab !== 'All' ? tab.toLocaleLowerCase() : ''}`}
                className={classNames('filter__link',
                  { selected: avtiveTab === tab })}
                onClick={handleClick}
                key={tab}
              >
                {tab}
              </a>
            ))}
          </nav>

          { completed && (
            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};
