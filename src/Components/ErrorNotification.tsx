import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  error: string;
  todos: Todo[];
};

export const ErrorNotification: React.FC<Props> = ({ error, todos }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: !error || todos.length > 0,
        },
      )}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {error}
    </div>
  );
};
