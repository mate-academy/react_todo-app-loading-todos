import classNames from 'classnames';
import { Errors } from '../types/Erorrs';

type Props = {
  counterItemLeft: () => number;
  setTypeError: (typeError: Errors) => void;
  setNotificationError: (notificationError: boolean) => void;
};

export const Header: React.FC<Props> = ({
  counterItemLeft,
  setTypeError,
  setNotificationError,
}) => {
  return (
    <header className="todoapp__header">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: (!counterItemLeft()) },
        )}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTypeError(Errors.ADD);
          setNotificationError(true);
        }}
      >
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
