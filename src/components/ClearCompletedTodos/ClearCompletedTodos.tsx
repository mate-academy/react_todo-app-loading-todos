import React from 'react';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  hasCompleted: boolean;
  onError: (ErrorType: ErrorType) => void;
};

export const ClearCompletedTodos: React.FC<Props> = React.memo(({
  hasCompleted,
  onError,
}) => (
  <button
    data-cy="ClearCompletedButton"
    type="button"
    className="todoapp__clear-completed"
    style={{ width: '100px' }}
    onClick={() => onError(ErrorType.DELETE)}
    disabled={!hasCompleted}
  >
    {hasCompleted
      ? 'Clear completed'
      : ''}
  </button>
));
