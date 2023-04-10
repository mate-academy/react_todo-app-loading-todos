import classNames from 'classnames';
import { LoadType } from '../../LoadType';

type Props = {
  typeOfLoad: LoadType;
  setTypeOfLoad: (typeOfLoad: LoadType) => void;
  activeTodos: number;
  completedTodos: number;
};

export const Footer: React.FC<Props> = ({
  typeOfLoad,
  setTypeOfLoad,
  activeTodos,
  completedTodos,
}) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      {`${activeTodos} items left`}
    </span>

    <nav className="filter">
      {Object.values(LoadType).map((type) => (
        <a
          key={type}
          href="#/"
          className={classNames(
            'filter__link',
            { type: type === typeOfLoad },
          )}
          onClick={() => setTypeOfLoad(type)}
        >
          {type}
        </a>
      ))}
    </nav>

    <button
      type="button"
      className={classNames(
        'todoapp__clear-completed',
        { hidden: completedTodos === 0 },
      )}
    >
      Clear completed
    </button>
  </footer>
);
