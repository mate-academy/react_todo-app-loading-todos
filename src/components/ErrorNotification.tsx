import { FC } from 'react';
import classNames from 'classnames';

type Props = {
  message: string;
};

export const ErrorNotification: FC<Props> = ({ message }) => (
  <div
    data-cy="ErrorNotification"
    className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      {
        hidden: !message,
      },
    )}
  >
    <button data-cy="HideErrorButton" type="button" className="delete" />
    {message}
  </div>
);
