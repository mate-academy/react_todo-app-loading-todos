import { FC, useCallback } from 'react';
import { TodoType } from '../types/Todo';
import { footerLinks } from '../utils/footer';
import classNames from 'classnames';

type Props = {
  selectedType: TodoType;
  handleSelectType: (data: TodoType) => void;
  hasCompleted: boolean;
  activeTodos?: number;
};

export const Footer: FC<Props> = ({
  selectedType,
  handleSelectType,
  hasCompleted,
  activeTodos = 0,
}) => {
  const selectType = useCallback(
    (data: TodoType) => {
      return (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        handleSelectType(data);
      };
    },
    [handleSelectType],
  );

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos} items left`}
      </span>
      <nav className="filter" data-cy="Filter">
        {footerLinks?.map(link => (
          <a
            key={link.key}
            href={link.href}
            data-cy={link.dataCy}
            className={classNames('filter__link', {
              selected: selectedType === link.key,
            })}
            onClick={selectType(link.key)}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
