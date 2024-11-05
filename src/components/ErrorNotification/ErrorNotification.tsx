import { FC } from 'react';
import { TodoErrors } from '../../utils/enums/TodoErrors';
import { getTodoErrorsMessage } from '../../utils/todos/getTodoErrorsMessage';
import cn from 'classnames';

interface IProps {
  error: TodoErrors | null;
}

export const ErrorNotification: FC<IProps> = ({ error }) => (
  <div
    data-cy="ErrorNotification"
    className={cn('notification is-danger is-light has-text-weight-normal', {
      hidden: !error,
    })}
  >
    <button data-cy="HideErrorButton" type="button" className="delete" />
    {error && getTodoErrorsMessage(error)}
  </div>
);
