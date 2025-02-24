import { useEffect, useState } from 'react';
import { ERROR } from '../../types/Error';
import classNames from 'classnames';

type Props = {
  error: (typeof ERROR)[keyof typeof ERROR];
};

export const ErrorMessage: React.FC<Props> = ({ error }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(false);

    if (error !== 'noError') {
      setIsVisible(true);
    }

    setTimeout(() => setIsVisible(false), 3000);
  }, [error]);

  const errorClassName = classNames(
    { hidden: !isVisible },
    'notification',
    'is-danger',
    'is-light',
    'has-text-weight-normal',
  );

  return (
    <div data-cy="ErrorNotification" className={errorClassName}>
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {error === 'couldntLoadTodos' && 'Unable to load todos'}
      <br />
      {error === 'noTitle' && 'Title should not be empty'}
      <br />
      {error === 'unableToAdd' && 'Unable to add a todo'}
      <br />
      {error === 'unableToDelete' && 'Unable to delete a todo'}
      <br />
      {error === 'unableToUpdate' && 'Unable to update a todo'}
    </div>
  );
};
