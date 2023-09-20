import cn from 'classnames';
import { ForComletedTodo } from '../types/enumFilter';

interface Props {
  condition: ForComletedTodo;
  setCondition: (condition: ForComletedTodo) => void;
}

export const NavMenu: React.FunctionComponent<Props> = ({
  condition,
  setCondition,
}) => {
  return (
    <nav className="filter">
      {Object.entries(ForComletedTodo).map(([key, value]) => (
        <a
          key={value}
          href={`#/${value}`}
          className={cn('filter__link', {
            selected: value === condition,
          })}
          onClick={() => setCondition(value)}
        >
          {key}
        </a>
      ))}
    </nav>
  );
};
