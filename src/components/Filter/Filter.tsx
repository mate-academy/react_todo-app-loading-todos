import classNames from 'classnames';
import { Tab } from '../../types/Tab';

type Props = {
  tabs: Tab[];
  selectedTabId: string;
  onTabSelected: (value:Tab) => void;
};

export const Filter: React.FC<Props> = ({
  tabs,
  selectedTabId,
  onTabSelected,
}) => {
  const selectedTab = tabs.find(tab => selectedTabId === tab.id) || tabs[0];

  const handleClick = (tab: Tab) => (
    tab.id !== selectedTabId && onTabSelected(tab)
  );

  return (
    <nav className="filter" data-cy="Filter">
      {tabs.map((tab) => (
        <a
          key={tab.id}
          data-cy={`FilterLink${tab.title}`}
          href={`#${tab.link}`}
          className={classNames(
            'filter__link',
            {
              selected: tab.id === selectedTab.id,
            },
          )}
          onClick={() => handleClick(tab)}
        >
          {tab.title}
        </a>
      ))}
    </nav>
  );
};
