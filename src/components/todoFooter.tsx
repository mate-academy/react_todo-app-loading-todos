import { Dispatch, SetStateAction, useState } from 'react';
import classNames from 'classnames';
// eslint-disable-next-line import/no-cycle
import { FilterBy } from '../App';

interface Props {
  setFilterBy: Dispatch<SetStateAction<FilterBy>>,
}

export const TodoFooter: React.FC<Props> = ({ setFilterBy }) => {
  const navItems = [
    {
      title: 'All',
      id: 'ALL',
    },
    {
      title: 'Active',
      id: 'ACTIVE',
    },
    {
      title: 'Completed',
      id: 'COMPLETED',
    }];
  const [selectedType, setSelectedType] = useState('');

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        {navItems.map((navItem) => (
          <a
            href="#/"
            id={navItem.id}
            className={classNames(
              'filter__link',
              {
                selected: selectedType === navItem.title,
              },
            )}
            key={navItem.id}
            onClick={() => {
              switch (navItem.id) {
                case FilterBy.ACTIVE:
                  setFilterBy(FilterBy.ACTIVE);
                  break;

                case FilterBy.COMPLETED:
                  setFilterBy(FilterBy.COMPLETED);
                  break;

                default:
                  setFilterBy(FilterBy.ALL);
                  break;
              }

              setSelectedType(navItem.title);
            }}
          >
            {navItem.title}
          </a>
        ))}
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
