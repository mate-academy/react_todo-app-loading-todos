import React from 'react';
import classnames from 'classnames';

interface ToggleAllButtonProps {
  isActive: boolean;
  onToggleAll: () => void;
}

export const ToggleAllButton: React.FC<ToggleAllButtonProps> = ({
  isActive,
  onToggleAll,
}) => (
  <button
    type="button"
    className={classnames('todoapp__toggle-all', {
      active: isActive,
    })}
    data-cy="ToggleAllButton"
    onClick={onToggleAll}
  />
);
