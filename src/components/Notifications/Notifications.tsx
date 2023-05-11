/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  errorType: ErrorType;
};

export const Notifications: React.FC<Props> = ({ errorType }) => (
  <div
    className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: errorType === ErrorType.NONE },
    )}
  >
    <button type="button" className="delete" />
    {errorType === ErrorType.ADD && 'Unable to add a todo'}
    {errorType === ErrorType.DELETE && 'Unable to delete a todo'}
    {errorType === ErrorType.UPDATE && 'Unable to update a todo'}
  </div>
);
