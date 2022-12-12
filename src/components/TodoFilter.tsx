import classNames from 'classnames';
import React from 'react';
import { Filter } from '../types/Filter';

interface Props {
  dataAttr: string,
  hrefAttr: string,
  name: Filter,
  isSelected: Filter,
  onTodoFilter: (filterBy: Filter) => void,
}

export const TodoFilter: React.FC<Props> = ({
  dataAttr,
  hrefAttr,
  name,
  isSelected,
  onTodoFilter,
}) => {
  return (
    <a
      data-cy={dataAttr}
      href={hrefAttr}
      className={classNames('filter__link', {
        selected: isSelected === name,
      })}
      onClick={() => onTodoFilter(name as Filter)}
    >
      {name}
    </a>
  );
};
