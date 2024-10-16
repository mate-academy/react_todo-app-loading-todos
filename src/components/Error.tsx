import { Dispatch, FC, SetStateAction } from 'react';
import cn from 'classnames';

type Props = {
  errorMessage: string;
  onChangeError: Dispatch<SetStateAction<string>>;
};

export const Error: FC<Props> = ({ errorMessage, onChangeError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorMessage,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onChangeError('')}
      />
      {errorMessage}
    </div>
  );
};
