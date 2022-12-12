import classNames from 'classnames';
import React from 'react';

interface Props {
  dataAttr: string,
  hrefAttr: string,
  name: string,
  isSelected: string,
  onTodoFilter: (filterBy: string) => void,
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
      onClick={() => onTodoFilter(name)}
    >
      {name}
    </a>
  );
};
