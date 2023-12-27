import classNames from 'classnames';
import { filters } from './data/filters';
import { getHash } from '../../libs/helpers';

export const TodosFilter = () => {
  const urlHash = getHash();

  return (
    <nav className="filter" data-cy="Filter">
      {filters.map(({ title, hash, dataCy }) => (
        <a
          key={hash}
          href={hash}
          className={classNames('filter__link', {
            selected: hash === urlHash,
          })}
          dat-cy={dataCy}
        >
          {title}
        </a>
      ))}
    </nav>
  );
};
