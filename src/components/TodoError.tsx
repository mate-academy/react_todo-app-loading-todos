import React from 'react';
import cn from 'classnames';
import { ErrorMessageEnum } from '../types/ErrorMessageEnum';

type Props = {
  errorMessage: ErrorMessageEnum | '';
  hasMistake: boolean;
  setHasMistake: (status: boolean) => void;
};

export const TodoError: React.FC<Props> = ({
  errorMessage,
  hasMistake,
  setHasMistake,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification is-danger is-light has-text-weight-normal', {
          hidden: !hasMistake,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label={`Hide Error: ${errorMessage}`}
        onClick={() => setHasMistake(false)}
      />
      {errorMessage}
    </div>
  );
};
